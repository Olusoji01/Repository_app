// RepositoryDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const RepositoryDetail = () => {
  const { id } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    const fetchRepo = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${id}`);
        setRepo(response.data);
      } catch (error) {
        console.error('Error fetching repository:', error);
      }
    };

    fetchRepo();
  }, [id]);

  return (
    <div>
      {repo ? (
        <div>
          <h2>{repo.name}</h2>
          <p>Description: {repo.description}</p>
          <p>Language: {repo.language}</p>
          <p>Stars: {repo.stargazers_count}</p>
          <p>Forks: {repo.forks_count}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default RepositoryDetail;
