import { useEffect } from "react";

import { siteConfig } from "@/lib/site";

function setMeta(selector: string, attribute: string, content: string): void {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, content);
  }
}

/** Keeps the document title and description in sync per route. */
export function useDocumentMeta({
  title,
  description,
}: {
  title: string;
  description: string;
}): void {
  useEffect(() => {
    const fullTitle =
      title === siteConfig.name
        ? `${siteConfig.name} \u2014 ${siteConfig.role}`
        : `${title} | ${siteConfig.name}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", fullTitle);
    setMeta('meta[property="og:description"]', "content", description);
  }, [title, description]);
}
