import { describe, expect, it } from "vitest";
import { robotsTxt, sitemapXml } from "./seo";

describe("robots.txt", () => {
  const robots = robotsTxt("https://relaxason.example.com");

  it("keeps crawlers out of the API and the sign-in redirects only", () => {
    expect(robots).toMatch(/^User-agent: \*\nAllow: \/\n/);
    expect(robots).toContain("Disallow: /api/\n");
    expect(robots).toContain("Disallow: /auth/\n");
    expect(robots.match(/Disallow/g)).toHaveLength(2);
  });

  it("names the sitemap by its full address", () => {
    expect(robots).toContain(
      "Sitemap: https://relaxason.example.com/sitemap.xml",
    );
  });
});

describe("sitemap.xml", () => {
  it("lists the home page at its canonical address, with the slash", () => {
    expect(sitemapXml("https://relaxason.example.com")).toContain(
      "<url><loc>https://relaxason.example.com/</loc></url>",
    );
  });

  it("escapes what XML can't hold as is", () => {
    expect(sitemapXml("https://example.com/a&b")).toContain(
      "<loc>https://example.com/a&amp;b/</loc>",
    );
  });
});
