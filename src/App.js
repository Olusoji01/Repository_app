import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RepositoryList from './RepositoryList';
import RepositoryDetail from './RepositoryDetail';
import ErrorBoundary from './ErrorBoundary.jsx';
import NotFound from './NotFound.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={RepositoryList} />
        <Route path="/repo/:id" component={RepositoryDetail} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
