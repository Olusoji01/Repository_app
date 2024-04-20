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