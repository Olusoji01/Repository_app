import React from 'react';
import RepositoryList from './RepositoryList';

function App() {
  const username = 'Olusoji01'; // GitHub username

  return (
    <div className="App">
      <RepositoryList username={username}/>
    </div>
  );
}

export default App;