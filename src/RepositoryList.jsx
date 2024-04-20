import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RepositoryList.css"; // Import CSS file for styling

const RepositoryList = ({ username }) => {
  // Creating states to hold the repositories, page, search query, and filter option
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("name"); // Default filter option is by repository name

  // Calling useEffect to fetch the repositories
  useEffect(() => {
    fetchRepositories();
  }, [username, page, searchQuery, filterOption]);

  const fetchRepositories = async () => {
    try {
      // Fetching the repositories using axios
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            page: page,
            per_page: 10, // Number of repositories per page
            sort: filterOption, // Sorting by selected filter option
            q: searchQuery, // Searching by search query
          },
        }
      );
      setRepositories(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
    }
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  return (
    <div className="repository-list-container">
      <div className="second_div">
        <h2>GitHub Repositories</h2>
        {/* Search and Filter inputs */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <select value={filterOption} onChange={handleFilterChange}>
            <option value="name">Name</option>
            <option value="language">Language</option>
            {/* Add more filter options if needed */}
          </select>
        </div>
        <ul className="repository-list">
          {repositories.map((repo) => (
            <li key={repo.id}>
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                {repo.name}
              </a>
              {repo.description && <p>{repo.description}</p>}
            </li>
          ))}
        </ul>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage}>Next Page</button>
        </div>
      </div>
    </div>
  );
};

export default RepositoryList;
