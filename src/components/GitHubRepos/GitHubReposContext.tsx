import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
} from "react";
import { useGitHubRepositories } from "../../hooks/useGitHubRepositories";
import {
  RepoType,
  SortOption,
  SortDirection,
  PaginationLinks,
  Repository,
} from "../../types/repository";
import {
  DEBOUNCE_DELAY,
  DEFAULT_TYPE,
  DEFAULT_SORT,
  DEFAULT_DIRECTION,
} from "../../config/github";
import { useDebounce } from "../../hooks/useDebounce";

interface GitHubReposContextType {
  // State
  inputValue: string;
  username: string;
  repoType: RepoType;
  sortBy: SortOption;
  sortDirection: SortDirection;
  repositories: Repository[];
  loading: boolean;
  error: string | null;
  links: PaginationLinks;

  // Actions
  setInputValue: Dispatch<React.SetStateAction<string>>;
  setUsername: Dispatch<React.SetStateAction<string>>;
  setRepoType: Dispatch<React.SetStateAction<RepoType>>;
  setSortBy: Dispatch<React.SetStateAction<SortOption>>;
  setSortDirection: Dispatch<React.SetStateAction<SortDirection>>;
  navigateToPage: (url: string | undefined) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GitHubReposContext = createContext<GitHubReposContextType | undefined>(
  undefined,
);

interface GitHubReposProviderProps {
  children: ReactNode;
  initialUsername?: string;
}

export const GitHubReposProvider: React.FC<GitHubReposProviderProps> = ({
  children,
  initialUsername = "",
}) => {
  // Local state for form input
  const [inputValue, setInputValue] = useState<string>(initialUsername);

  // Debounced username for API calls
  const [username, setUsername] = useState<string>(initialUsername);
  const debouncedUsername = useDebounce(username, DEBOUNCE_DELAY);

  // Filter and sort options
  const [repoType, setRepoType] = useState<RepoType>(DEFAULT_TYPE);
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT);
  const [sortDirection, setSortDirection] =
    useState<SortDirection>(DEFAULT_DIRECTION);

  // Fetch repositories using the custom hook
  const { repositories, loading, error, links, fetchRepositories } =
    useGitHubRepositories({
      username: debouncedUsername,
      repoType,
      sortBy,
      sortDirection,
    });

  // Navigate to a specific page by URL
  const navigateToPage = (url: string | undefined): void => {
    if (!url) return;
    fetchRepositories(url);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setUsername(inputValue);
  };

  const value = {
    // State
    inputValue,
    username: debouncedUsername,
    repoType,
    sortBy,
    sortDirection,
    repositories,
    loading,
    error,
    links,

    // Actions
    setInputValue,
    setUsername,
    setRepoType,
    setSortBy,
    setSortDirection,
    navigateToPage,
    handleSubmit,
  };

  return (
    <GitHubReposContext.Provider value={value}>
      {children}
    </GitHubReposContext.Provider>
  );
};

export const useGitHubReposContext = (): GitHubReposContextType => {
  const context = useContext(GitHubReposContext);

  if (context === undefined) {
    throw new Error(
      "useGitHubReposContext must be used within a GitHubReposProvider",
    );
  }

  return context;
};
