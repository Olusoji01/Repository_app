import React from 'react';
import RepositoryList from './RepositoryList';

function App() {
  const username = 'Olusoji01';
  const token = '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';

  return (
    <div className="App">
      <RepositoryList username={username} token={token} />
    </div>
  );
}

export default App;