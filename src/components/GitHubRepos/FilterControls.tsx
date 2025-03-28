import React from "react";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { useGitHubReposContext } from "./GitHubReposContext";
import { scrollToTop } from "../../utils/pagination";
import { RepoType, SortOption } from "../../types/repository";

export const FilterControls: React.FC = () => {
  const {
    repoType,
    setRepoType,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    repositories,
    error,
  } = useGitHubReposContext();

  // Don't show controls if there are no repositories
  if (repositories.length === 0 || error) {
    return null;
  }

  const handleRepoTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRepoType(e.target.value as RepoType);
    scrollToTop();
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    scrollToTop();
  };

  const handleSortDirectionChange = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    scrollToTop();
  };

  const repoTypeOptions = [
    { value: "owner", label: "Owner" },
    { value: "member", label: "Member" },
    { value: "all", label: "All" },
  ];

  const sortByOptions = [
    { value: "updated", label: "Last Updated" },
    { value: "created", label: "Created" },
    { value: "pushed", label: "Last Pushed" },
    { value: "full_name", label: "Full Name" },
  ];

  return (
    <div className="mb-4 flex flex-col flex-wrap items-center gap-4 md:flex-row">
      <div className="w-full md:w-auto">
        <Select
          id="repoType"
          value={repoType}
          onChange={handleRepoTypeChange}
          options={repoTypeOptions}
          label="Repository type"
        />
      </div>

      <div className="w-full md:w-auto">
        <Select
          id="sortBy"
          value={sortBy}
          onChange={handleSortChange}
          options={sortByOptions}
          label="Sort by"
        />
      </div>

      <div className="mt-4 md:mt-0">
        <Button
          onClick={handleSortDirectionChange}
          variant="secondary"
          type="button"
          aria-label={`Sort ${sortDirection === "desc" ? "descending" : "ascending"}`}
        >
          {sortDirection === "desc" ? "↓ Descending" : "↑ Ascending"}
        </Button>
      </div>
    </div>
  );
};
