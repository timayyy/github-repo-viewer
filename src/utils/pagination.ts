import {PaginationLinks} from "../types/repository";

/**
 * Parse GitHub API Link header to extract pagination URLs
 * @param linkHeader - Link header string from GitHub API response
 * @returns Object containing URLs for first, prev, next, and last pages
 */
export const parseLinkHeader = (linkHeader: string | null): PaginationLinks => {
  if (!linkHeader) return {};

  const parts = linkHeader.split(",");
  const links: PaginationLinks = {};

  parts.forEach((part) => {
    const match = part.match(/<([^>]+)>;\s*rel="([^"]+)"/);
    if (match) {
      const url = match[1];
      const rel = match[2];

      if (rel === "first" || rel === "prev" || rel === "next" || rel === "last") {
        links[rel as keyof PaginationLinks] = url;
      }
    }
  });

  return links;
};

/**
 * Scroll to the top of the window with smooth animation
 */
export const scrollToTop = (): void => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
