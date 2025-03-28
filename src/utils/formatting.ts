import {Repository, SortOption} from "../types/repository";

/**
 * Format a date string to a more readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "Mar 27, 2025")
 */
export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Get the appropriate display for the last activity timestamp based on sort
 * @param repo - Repository object
 * @param sortBy - Current sort option
 * @returns Formatted date string
 */
export const getActivityTimestamp = (repo: Repository, sortBy: SortOption): string => {
  let date: string;

  switch (sortBy) {
    case "created":
      date = repo.created_at;
      break;
    case "pushed":
      date = repo.pushed_at;
      break;
    default:
      date = repo.updated_at;
  }

  return formatDate(date);
};

/**
 * Get label for timestamp based on sort option
 * @param sortBy - Current sort option
 * @returns Label string (e.g., "Created", "Updated", "Pushed")
 */
export const getTimestampLabel = (sortBy: SortOption): string => {
  switch (sortBy) {
    case "created":
      return "Created";
    case "pushed":
      return "Pushed";
    default:
      return "Updated";
  }
};
