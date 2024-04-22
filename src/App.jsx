import React from "react";
import RepositoryList from "./RepositoryList";
import SingleRepository from "./SingleRepository";
import ErrorBoundary from "./ErrorBoundary"; // Correct import for ErrorBoundary
import ErrorPage from "./ErrorPage";
import RepositoryDetails from "./RepositoryDetails";
import NotFoundPage from "./NotFoundPage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  const username = "Olusoji01"; // GitHub username

  return (
    <Router>
      <div className="app">
        <ErrorBoundary>
          <Switch>
            <Route path="/" exact>
              <RepositoryList username={username} />
            </Route>
            <Route path="/repository/:repoName">
              <SingleRepository />
            </Route>
            <Route path="/error">
              <ErrorPage />
            </Route>
            <Route path="/details/:repoId">
              <RepositoryDetails username={username} />
            </Route>
            <Route path="/404">
              <NotFoundPage />
            </Route>
            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
