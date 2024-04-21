import React from "react";
import RepositoryList from "./RepositoryList";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SingleRepository from "./SingleRepository";
import ErrorBoundary from "./ErrorBoundary";
import RepositoryDetails from "./RepositoryDetails";
import NotFound from "./NotFound";

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
            <Route path="/single_repo">
              <SingleRepository />
            </Route>
            <Route path="/details/:repoId">
              <RepositoryDetails />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;
