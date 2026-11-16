import { describe, expect, it } from "vitest";
import { safeReturnTo } from "./return-to";

describe("safeReturnTo", () => {
  it("keeps a path on this site", () => {
    expect(safeReturnTo("/soins?vue=tarifs")).toBe("/soins?vue=tarifs");
  });

  const unsafe: Record<string, unknown> = {
    "another site": "https://evil.example",
    "a protocol-relative URL": "//evil.example",
    "a backslash trick": "/\\evil.example",
    "a tab trick": "/\t/evil.example",
    "a newline trick": "/\n/evil.example",
    "a carriage return trick": "/\r/evil.example",
    "a relative path": "soins",
    "a non-string": ["/soins"],
  };
  for (const [name, value] of Object.entries(unsafe)) {
    it(`falls back for ${name}`, () => {
      expect(safeReturnTo(value)).toBe("/");
    });
  }
});
