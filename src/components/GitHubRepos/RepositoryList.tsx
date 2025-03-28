import React from "react";
import { RepositoryCard } from "./RepositoryCard";
import { useGitHubReposContext } from "./GitHubReposContext";

export const RepositoryList: React.FC = () => {
  const { repositories, loading, username, error } = useGitHubReposContext();

  // Don't show repos if error
  if (error) {
    return null;
  }

  // Loading state
  if (loading && repositories.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading repositories...</p>
      </div>
    );
  }

  // Empty state when username exists but no repos found
  if (repositories.length === 0 && username && !error && !loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <p className="mt-2 text-xl font-semibold">No repositories found</p>
        <p className="mt-1">
          This user doesn't have any repositories matching your filters.
        </p>
      </div>
    );
  }

  // No username entered yet
  if (repositories.length === 0 && !username && !error && !loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <p className="mt-2 text-xl font-semibold">Search for a GitHub user</p>
        <p className="mt-1">Enter a username to see their repositories.</p>
      </div>
    );
  }

  // Display repositories
  return (
    <div className="space-y-4">
      {repositories.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
};
