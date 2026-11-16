import { useEffect } from "react";
import { site } from "@relaxason/core";

export interface PageMeta {
  /** Shown as "<title> | Relaxa'Son". */
  title?: string;
  /** The whole title, for public pages that word their own. */
  fullTitle?: string;
  description?: string;
  /** A path on this site, or an absolute URL. */
  image?: string;
  type?: "website" | "article";
  /** App screens and error pages: ask search engines not to index them. */
  noindex?: boolean;
}

function setMeta(key: "name" | "property", name: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${key}="${name}"]`,
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(key, name);
    document.head.append(meta);
  }
  meta.content = content;
}

/**
 * Sets the page's title, description, canonical URL and social metadata, and
 * asks search engines not to index app screens. index.html holds the defaults
 * that crawlers see first: the home page's.
 */
export function usePageMeta({
  title,
  fullTitle,
  description = site.description,
  image = "/og-image.jpg",
  type = "website",
  noindex = false,
}: PageMeta) {
  useEffect(() => {
    const pageTitle =
      fullTitle ?? (title ? `${title} | ${site.name}` : site.name);
    const url = `${window.location.origin}${window.location.pathname}`;
    const imageUrl = new URL(image, window.location.origin).href;

    document.title = pageTitle;
    setMeta("name", "description", description);
    setMeta("property", "og:type", type);
    setMeta("property", "og:title", pageTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:image", imageUrl);
    setMeta("name", "twitter:image", imageUrl);
    document.head
      .querySelector<HTMLLinkElement>('link[rel="canonical"]')
      ?.setAttribute("href", url);

    if (!noindex) return;
    const robots = document.createElement("meta");
    robots.name = "robots";
    robots.content = "noindex";
    document.head.append(robots);
    return () => robots.remove();
  }, [title, fullTitle, description, image, type, noindex]);
}
