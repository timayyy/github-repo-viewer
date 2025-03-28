import React from "react";
import { Button } from "../ui/Button";
import { useGitHubReposContext } from "./GitHubReposContext";

export const Pagination: React.FC = () => {
  const { links, navigateToPage, loading, repositories, error } =
    useGitHubReposContext();

  // Don't show pagination if there are no repositories or no pagination links
  if (
    repositories.length === 0 ||
    (!links.first && !links.prev && !links.next && !links.last) ||
    error
  ) {
    return null;
  }

  // Extract page numbers from links for better labeling
  const getPageNumber = (url: string | undefined): string => {
    if (!url) return "";

    try {
      const parsedUrl = new URL(url);
      const page = parsedUrl.searchParams.get("page");
      return page || "";
    } catch {
      return "";
    }
  };

  const nextPage = getPageNumber(links.next);
  const prevPage = getPageNumber(links.prev);

  return (
    <div
      className="mt-6 flex justify-center space-x-4"
      aria-label="Pagination navigation"
    >
      <Button
        onClick={() => navigateToPage(links.first)}
        disabled={loading || !links.first}
        variant="pagination"
        type="button"
        aria-label="Go to first page"
      >
        First
      </Button>

      <Button
        onClick={() => navigateToPage(links.prev)}
        disabled={loading || !links.prev}
        variant="pagination"
        type="button"
        aria-label={`Go to previous page${prevPage ? ` (page ${prevPage})` : ""}`}
      >
        Previous {prevPage && `(${prevPage})`}
      </Button>

      <Button
        onClick={() => navigateToPage(links.next)}
        disabled={loading || !links.next}
        variant="pagination"
        type="button"
        aria-label={`Go to next page${nextPage ? ` (page ${nextPage})` : ""}`}
      >
        Next {nextPage && `(${nextPage})`}
      </Button>

      <Button
        onClick={() => navigateToPage(links.last)}
        disabled={loading || !links.last}
        variant="pagination"
        type="button"
        aria-label="Go to last page"
      >
        Last
      </Button>
    </div>
  );
};
