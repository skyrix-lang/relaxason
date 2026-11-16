import { describe, expect, it } from "vitest";
import { contactMessageSchema } from "./contact-schema";

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.test",
  reason: "session",
  message: "Bonjour, je souhaite réserver une séance.",
};

describe("contactMessageSchema", () => {
  it("accepts a message, with the optional fields empty", () => {
    expect(contactMessageSchema.parse(valid)).toEqual({
      ...valid,
      phone: "",
      subject: "",
    });
  });

  it("trims the text fields", () => {
    const parsed = contactMessageSchema.parse({
      ...valid,
      name: "  Ada  ",
      message: "\n Bonjour \n",
    });
    expect(parsed.name).toBe("Ada");
    expect(parsed.message).toBe("Bonjour");
  });

  const invalid = {
    "a missing name": { name: " " },
    "an invalid email": { email: "ada@" },
    "an unknown reason": { reason: "spam" },
    "a missing reason": { reason: undefined },
    "an empty message": { message: "   " },
    "a message that is too long": { message: "x".repeat(5001) },
  };
  for (const [name, override] of Object.entries(invalid)) {
    it(`rejects ${name}`, () => {
      expect(
        contactMessageSchema.safeParse({ ...valid, ...override }).success,
      ).toBe(false);
    });
  }
});
