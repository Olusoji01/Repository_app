// SingleRepository.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const SingleRepository = ({ match }) => {
  const [repository, setRepository] = useState(null);

  useEffect(() => {
    const fetchRepository = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${match.params.username}/${match.params.repoName}`
        );
        setRepository(response.data);
      } catch (error) {
        console.error("Error fetching repository:", error);
      }
    };

    fetchRepository();
  }, [match.params.username, match.params.repoName]);

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
