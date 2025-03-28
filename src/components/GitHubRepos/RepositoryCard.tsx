import React from "react";
import { Repository } from "../../types/repository";
import { useGitHubReposContext } from "./GitHubReposContext";
import {
  getActivityTimestamp,
  getTimestampLabel,
} from "../../utils/formatting";

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository,
}) => {
  const { sortBy } = useGitHubReposContext();

  return (
    <a
      className="block"
      href={repository.html_url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="rounded border p-4 transition-colors hover:bg-gray-50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="mb-1 flex flex-wrap items-center gap-2 text-xl font-bold">
              <a
                href={repository.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="black hover:underline"
              >
                {repository.name}
              </a>
              {repository.fork && (
                <span className="rounded bg-gray-200 px-2 py-1 text-xs">
                  Forked
                </span>
              )}
              {repository.archived && (
                <span className="rounded bg-yellow-200 px-2 py-1 text-xs">
                  Archived
                </span>
              )}
              {repository.private && (
                <span className="rounded bg-purple-200 px-2 py-1 text-xs">
                  Private
                </span>
              )}
            </h2>
            <p className="mb-2 text-sm text-gray-600">{repository.full_name}</p>
          </div>

          <div className="flex items-center">
            {repository.owner && (
              <a
                href={repository.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
                aria-label={`${repository.owner.login}'s GitHub profile`}
              >
                <img
                  src={repository.owner.avatar_url}
                  alt={`${repository.owner.login}'s avatar`}
                  className="h-8 w-8 rounded-full"
                />
              </a>
            )}
          </div>
        </div>

        {repository.description && (
          <p className="mb-3 text-gray-700">{repository.description}</p>
        )}

        {repository.topics && repository.topics.length > 0 && (
          <div className="mb-3">
            {repository.topics.map((topic, index) => (
              <span
                key={index}
                className="mr-2 mb-1 inline-block rounded bg-black px-2 py-1 text-xs text-white"
              >
                {topic}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2 text-sm">
          {repository.language && (
            <span className="rounded bg-gray-200 px-2 py-1">
              {repository.language}
            </span>
          )}
          <span className="rounded bg-gray-200 px-2 py-1" title="Stars">
            ⭐ {repository.stargazers_count}
          </span>
          <span className="rounded bg-gray-200 px-2 py-1" title="Forks">
            🍴 {repository.forks_count}
          </span>
          {repository.open_issues_count > 0 && (
            <span className="rounded bg-gray-200 px-2 py-1" title="Open Issues">
              ⚠️ {repository.open_issues_count}
            </span>
          )}
          <span className="text-gray-500">
            {getTimestampLabel(sortBy)}:{" "}
            {getActivityTimestamp(repository, sortBy)}
          </span>
        </div>

        {repository.homepage && (
          <div className="mt-3">
            <a
              href={repository.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="black text-sm hover:underline"
            >
              Project Homepage
            </a>
          </div>
        )}
      </div>
    </a>
  );
};
