export interface RepositoryOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: RepositoryOwner;
  private: boolean;
  html_url: string;
  description: string | null;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  visibility: string;
  default_branch: string;
  open_issues_count: number;
  homepage: string | null;
  archived: boolean;
  disabled: boolean;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

export type RepoType = "all" | "owner" | "member";
export type SortOption = "created" | "updated" | "pushed" | "full_name";
export type SortDirection = "asc" | "desc";

export interface PaginationLinks {
  first?: string;
  prev?: string;
  next?: string;
  last?: string;
}
