import { useState, useCallback, useEffect } from "react";
import {
  Repository,
  PaginationLinks,
  RepoType,
  SortOption,
  SortDirection,
} from "../types/repository";
import { parseLinkHeader, scrollToTop } from "../utils/pagination";
import { buildGitHubReposUrl } from "../utils/api";
import {
  GITHUB_API_HEADERS,
  DEFAULT_TYPE,
  DEFAULT_SORT,
  DEFAULT_DIRECTION,
} from "../config/github";

interface UseGitHubRepositoriesProps {
  username: string;
  repoType?: RepoType;
  sortBy?: SortOption;
  sortDirection?: SortDirection;
  perPage?: number;
}

interface UseGitHubRepositoriesResult {
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  links: PaginationLinks;
  fetchRepositories: (url?: string) => Promise<void>;
}

/**
 * Custom hook for fetching and managing GitHub repository data
 */
export const useGitHubRepositories = ({
  username,
  repoType = DEFAULT_TYPE,
  sortBy = DEFAULT_SORT,
  sortDirection = DEFAULT_DIRECTION,
  perPage = 10,
}: UseGitHubRepositoriesProps): UseGitHubRepositoriesResult => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [links, setLinks] = useState<PaginationLinks>({});

  // Initialize the base URL for fetching repositories
  const baseUrl = useCallback(() => {
    if (!username.trim()) return null;
    return buildGitHubReposUrl(
      username,
      repoType,
      sortBy,
      sortDirection,
      perPage,
    );
  }, [username, repoType, sortBy, sortDirection, perPage]);

  // Fetch repositories from a specific URL
  const fetchRepositories = useCallback(
    async (url?: string): Promise<void> => {
      // If no URL is provided and we can't build a base URL, do nothing
      if (!url && !baseUrl()) return;

      const fetchUrl = url || (baseUrl() as string);

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(fetchUrl, {
          headers: GITHUB_API_HEADERS,
        });

        if (!response.ok) {
          throw new Error(
            response.status === 404
              ? "User not found"
              : `GitHub API error: ${response.status}`,
          );
        }

        // Extract and parse the Link header
        const linkHeader = response.headers.get("Link");
        const newLinks = parseLinkHeader(linkHeader);
        setLinks(newLinks);

        const data = (await response.json()) as Repository[];

        // Update repositories list
        setRepositories(data);

        // Scroll to top after data is loaded
        scrollToTop();
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred",
        );
        //Reset to initial state (clear state)
        setRepositories([]);
        setLinks({});
      } finally {
        setLoading(false);
      }
    },
    [baseUrl],
  );

  // Initial fetch when dependencies change
  useEffect(() => {
    if (!username.trim()) return;

    const url = baseUrl();
    if (url) {
      fetchRepositories(url);
    }
  }, [username, repoType, sortBy, sortDirection, baseUrl, fetchRepositories]);

  return {
    repositories,
    loading,
    error,
    links,
    fetchRepositories,
  };
};
