import { createServer } from "node:http";

// Stands in for Brevo's transactional email API while the e2e tests run, so
// the contact form is tested end to end without sending anything. It keeps
// what it received, for the tests to read (GET /sent), and refuses a message
// whose subject contains FAIL, to test the failure path.

const port = Number(process.env.BREVO_STUB_PORT);
const sent: unknown[] = [];

createServer((request, response) => {
  if (request.method === "GET" && request.url === "/sent") {
    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(sent));
    return;
  }
  if (request.method === "POST" && request.url === "/v3/smtp/email") {
    let body = "";
    request.on("data", (chunk: Buffer) => (body += chunk.toString()));
    request.on("end", () => {
      const email = JSON.parse(body) as { subject?: string };
      const authorized = request.headers["api-key"] === "e2e-brevo-key";
      if (!authorized || email.subject?.includes("FAIL")) {
        response.writeHead(authorized ? 500 : 401);
        response.end("{}");
        return;
      }
      sent.push(email);
      response.writeHead(201, { "content-type": "application/json" });
      response.end(JSON.stringify({ messageId: `<${sent.length}@stub>` }));
    });
    return;
  }
  response.writeHead(404);
  response.end();
}).listen(port, "127.0.0.1");
