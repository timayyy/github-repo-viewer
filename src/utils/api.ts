import { GITHUB_API_BASE_URL, DEFAULT_PER_PAGE } from "../config/github";
import { RepoType, SortOption, SortDirection } from "../types/repository";

/**
 * Build the initial GitHub API URL for fetching repositories
 * @param username - GitHub username
 * @param repoType - Type of repositories to fetch
 * @param sortBy - Sort criteria
 * @param sortDirection - Sort direction
 * @param perPage - Number of results per page
 * @returns Full GitHub API URL
 */
export const buildGitHubReposUrl = (
  username: string,
  repoType: RepoType,
  sortBy: SortOption,
  sortDirection: SortDirection,
  perPage = DEFAULT_PER_PAGE,
): string => {
  if (!username.trim()) {
    throw new Error("Username is required");
  }

  const url = new URL(`${GITHUB_API_BASE_URL}/users/${username}/repos`);

  url.searchParams.append("type", repoType);
  url.searchParams.append("sort", sortBy);
  url.searchParams.append("direction", sortDirection);
  url.searchParams.append("per_page", perPage.toString());

  return url.toString();
};

/**
 * Handle and format API errors
 * @param error - Error object
 * @returns Formatted error message
 */
export const formatApiError = (error: unknown): string => {
  if (error instanceof Response) {
    return error.status === 404
      ? "User not found"
      : `GitHub API error: ${error.status}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
};
