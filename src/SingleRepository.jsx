// SingleRepository.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleRepository = () => {
  const { repoName } = useParams(); // Get the repoName from URL params
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/YourUsername/${repoName}` // Replace YourUsername with your GitHub username
        );
        setRepository(response.data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };
    fetchRepository();
  }, [repoName]);

  if (!repository) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single_repo">
      <h2>{repository.name}</h2>
      <p>{repository.description}</p>
      <p>Language: {repository.language}</p>
      <p>Stars: {repository.stargazers_count}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default SingleRepository;

