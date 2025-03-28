import React from "react";
import {GitHubReposProvider} from "./GitHubReposContext";
import {SearchForm} from "./SearchForm";
import {FilterControls} from "./FilterControls";
import {RepositoryList} from "./RepositoryList";
import {Pagination} from "./Pagination";
import {ErrorDisplay} from "./ErrorDisplay";

interface GitHubReposProps {
  initialUsername?: string;
}

export const GitHubRepos: React.FC<GitHubReposProps> = ({initialUsername = ""}) => {
  return (
    <GitHubReposProvider initialUsername={initialUsername}>
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">GitHub Repository Viewer</h1>

        <SearchForm />
        <ErrorDisplay />
        <FilterControls />
        <RepositoryList />
        <Pagination />
      </div>
    </GitHubReposProvider>
  );
};
