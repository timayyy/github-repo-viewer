import React from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useGitHubReposContext } from "./GitHubReposContext";

export const SearchForm: React.FC = () => {
  const { inputValue, setInputValue, handleSubmit, loading } =
    useGitHubReposContext();

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-grow">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Can add if you want to debounce onInputChange
              // setUsername(e.target.value);
            }}
            placeholder="Enter GitHub username"
            aria-label="GitHub username"
          />
        </div>
        <Button
          type="submit"
          variant="primary"
          isLoading={loading}
          disabled={loading || inputValue.trim() === ""}
        >
          Search
        </Button>
      </div>
    </form>
  );
};
