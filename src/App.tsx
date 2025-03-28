import "./App.css";
import { GitHubRepos } from "./components/GitHubRepos";

function App() {
  return (
    <>
      <GitHubRepos initialUsername="octocat" />
    </>
  );
}

export default App;
