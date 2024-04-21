// RepositoryDetails.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RepositoryDetails = () => {
  const { repoId } = useParams();
  const [repoDetails, setRepoDetails] = useState(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/YourUsername/${repoId}` // Replace YourUsername with your GitHub username
        );
        setRepoDetails(response.data);
      } catch (error) {
        console.error("Error fetching repository details:", error);
      }
    };

    fetchRepoDetails();
  }, [repoId]);

  if (!repoDetails) return <div>Loading...</div>;

  return (
    <div className="repo_details">
      <h2>{repoDetails.name}</h2>
      <p>{repoDetails.description}</p>
      {/* Display more details as needed */}
    </div>
  );
};

export default RepositoryDetails;
