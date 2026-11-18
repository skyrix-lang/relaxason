import { readFileSync } from "node:fs";
import { createServer as createHttpServer } from "node:http";
import { createServer, type Socket } from "node:net";
import { resolve } from "node:path";
import { TLSSocket } from "node:tls";
import { pathToFileURL } from "node:url";

// Stands in for the SMTP server (Scaleway) while the e2e tests run, so the
// contact form is tested end to end without sending anything. It speaks just
// enough SMTP for Nodemailer: EHLO, STARTTLS (apps/bff/src/mail.ts refuses to
// send credentials in clear), AUTH, MAIL, RCPT, DATA. It keeps what it
// received, for the tests to read (GET /sent on SMTP_STUB_HTTP_PORT), and
// refuses a message whose subject contains FAIL, to test the failure path.
//
// Its certificate (e2e/smtp-stub/, for localhost, test-only) is trusted by the
// server under test through NODE_EXTRA_CA_CERTS, set in playwright.config.ts.

export interface SentEmail {
  to: { email: string }[];
  sender: { name: string; email: string };
  subject: string;
  htmlContent: string;
  replyTo: { email: string };
}

/** `=?UTF-8?Q?Contact_Sonoth=C3=A9rapie?=` → `Contact Sonothérapie`. */
export function decodeWords(value: string): string {
  return value.replace(
    /=\?utf-8\?([bq])\?([^?]*)\?=/gi,
    (_, encoding: string, text: string) =>
      encoding.toLowerCase() === "b"
        ? Buffer.from(text, "base64").toString("utf8")
        : decodeQuotedPrintable(text.replaceAll("_", " ")),
  );
}

export function decodeQuotedPrintable(text: string): string {
  const bytes = text
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-F]{2})/gi, (_, hex: string) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
  return Buffer.from(bytes, "latin1").toString("utf8");
}

/** `"Name" <a@b>` or `a@b` → its name and address. */
function address(value = ""): { name: string; email: string } {
  const match = /^\s*(?:"?([^"<]*?)"?\s*)?<([^>]+)>\s*$/.exec(value);
  return match
    ? { name: decodeWords(match[1] ?? ""), email: match[2]! }
    : { name: "", email: value.trim() };
}

/** Headers, unfolded, with lowercase names. */
function headersOf(block: string): Map<string, string> {
  const headers = new Map<string, string>();
  for (const line of block.replace(/\r?\n[ \t]+/g, " ").split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon > 0) {
      headers.set(
        line.slice(0, colon).trim().toLowerCase(),
        line.slice(colon + 1).trim(),
      );
    }
  }
  return headers;
}

/** The text/html part of a message, decoded. */
function htmlOf(headers: Map<string, string>, body: string): string {
  const type = headers.get("content-type") ?? "";
  const boundary = /boundary="?([^";]+)"?/i.exec(type)?.[1];
  if (boundary) {
    for (const part of body.split(`--${boundary}`)) {
      const split = part.search(/\r?\n\r?\n/);
      if (split < 0) continue;
      const html = htmlOf(
        headersOf(part.slice(0, split)),
        part.slice(split).replace(/^\r?\n\r?\n/, ""),
      );
      if (html) return html;
    }
    return "";
  }
  if (!type.toLowerCase().startsWith("text/html")) return "";
  const encoding = (
    headers.get("content-transfer-encoding") ?? ""
  ).toLowerCase();
  if (encoding === "quoted-printable") return decodeQuotedPrintable(body);
  if (encoding === "base64") {
    return Buffer.from(body.replace(/\s/g, ""), "base64").toString("utf8");
  }
  return body;
}

/** What a test needs from a raw message, in the shape the tests check. */
export function parseMessage(raw: string, recipients: string[]): SentEmail {
  const split = raw.search(/\r?\n\r?\n/);
  const headers = headersOf(raw.slice(0, split));
  const body = raw.slice(split).replace(/^\r?\n\r?\n/, "");
  return {
    to: recipients.map((email) => ({ email })),
    sender: address(headers.get("from")),
    subject: decodeWords(headers.get("subject") ?? ""),
    htmlContent: htmlOf(headers, body),
    replyTo: { email: address(headers.get("reply-to")).email },
  };
}

function serve(socket: Socket, tls: { key: Buffer; cert: Buffer }) {
  let connection: Socket = socket;
  let buffer = "";
  let inData = false;
  let recipients: string[] = [];
  const reply = (line: string) => connection.write(`${line}\r\n`);

  const onData = (chunk: Buffer) => {
    buffer += chunk.toString("latin1");
    for (;;) {
      if (inData) {
        const end = buffer.indexOf("\r\n.\r\n");
        if (end < 0) return;
        const raw = Buffer.from(
          buffer.slice(0, end).replace(/^\.\./gm, "."),
          "latin1",
        ).toString("utf8");
        buffer = buffer.slice(end + 5);
        inData = false;
        const email = parseMessage(raw, recipients);
        recipients = [];
        if (email.subject.includes("FAIL")) {
          reply("550 5.7.1 Refused by the stub");
        } else {
          sent.push(email);
          reply(`250 2.0.0 Ok: queued as ${sent.length}`);
        }
        continue;
      }
      const end = buffer.indexOf("\r\n");
      if (end < 0) return;
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      const command = line.slice(0, 4).toUpperCase();
      if (command === "EHLO" || command === "HELO") {
        const secure = connection !== socket;
        reply("250-localhost");
        reply(secure ? "250 AUTH PLAIN LOGIN" : "250 STARTTLS");
      } else if (line.toUpperCase() === "STARTTLS") {
        reply("220 2.0.0 Ready to start TLS");
        socket.removeListener("data", onData);
        connection = new TLSSocket(socket, { isServer: true, ...tls });
        connection.on("data", onData);
        connection.on("error", () => connection.destroy());
      } else if (command === "AUTH") {
        const credentials = Buffer.from(line.split(" ")[2] ?? "", "base64")
          .toString("utf8")
          .split("\0");
        const ok =
          credentials[1] === "e2e" && credentials[2] === "e2e-password";
        reply(ok ? "235 2.7.0 Authenticated" : "535 5.7.8 Bad credentials");
      } else if (command === "MAIL") {
        reply("250 2.1.0 Ok");
      } else if (command === "RCPT") {
        recipients.push(/<([^>]+)>/.exec(line)?.[1] ?? "");
        reply("250 2.1.5 Ok");
      } else if (command === "DATA") {
        inData = true;
        reply("354 End data with <CR><LF>.<CR><LF>");
      } else if (command === "QUIT") {
        reply("221 2.0.0 Bye");
        connection.end();
      } else if (command === "RSET" || command === "NOOP") {
        reply("250 2.0.0 Ok");
      } else {
        reply("502 5.5.2 Command not implemented");
      }
    }
  };
  socket.on("data", onData);
  socket.on("error", () => socket.destroy());
  reply("220 localhost ESMTP e2e stub");
}

const sent: SentEmail[] = [];

if (import.meta.url === pathToFileURL(resolve(process.argv[1] ?? "")).href) {
  const tls = {
    key: readFileSync(new URL("smtp-stub/key.pem", import.meta.url)),
    cert: readFileSync(new URL("smtp-stub/cert.pem", import.meta.url)),
  };
  createServer((socket) => serve(socket, tls)).listen(
    Number(process.env.SMTP_STUB_PORT),
    "127.0.0.1",
  );
  createHttpServer((request, response) => {
    if (request.method === "GET" && request.url === "/sent") {
      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(sent));
      return;
    }
    response.writeHead(404);
    response.end();
  }).listen(Number(process.env.SMTP_STUB_HTTP_PORT), "127.0.0.1");
}
