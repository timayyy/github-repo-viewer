import React from "react";
import {useGitHubReposContext} from "./GitHubReposContext";

export const ErrorDisplay: React.FC = () => {
  const {error} = useGitHubReposContext();

  if (!error) return null;

  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex">
        <svg
          className="h-5 w-5 text-red-500 mr-2"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
        <span className="block sm:inline">{error}</span>
      </div>
    </div>
  );
};
