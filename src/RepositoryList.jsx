import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom"; // Import useHistory and Redirect from React Router
import ErrorPage from "./ErrorPage"; // Import the ErrorPage component
import NotFoundPage from "./NotFoundPage"; // Import the NotFoundPage component
import "./RepositoryList.css";

const RepositoryList = ({ username }) => {
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("name");
  const [redirectToError, setRedirectToError] = useState(false); // State to manage redirection to error page
  const [redirectTo404, setRedirectTo404] = useState(false); // State to manage redirection to 404 page
  const history = useHistory(); // Initialize useHistory

  useEffect(() => {
    fetchRepositories();
  }, [username, page, searchQuery, filterOption]);

  const fetchRepositories = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          params: {
            page: page,
            per_page: 10,
            sort: filterOption,
            q: searchQuery,
          },
        }
      );
      setRepositories(response.data);
    } catch (error) {
      console.error("Error fetching repositories:", error);
      if (error.response && error.response.status === 404) {
        setRedirectTo404(true); // Set state to trigger redirection to 404 page for API errors
      } else {
        setRedirectToError(true); // Set state to trigger redirection to error page for other errors
      }
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

  const redirectToErrorPage = () => {
    setRedirectToError(true); // Set state to trigger redirection to error page
  };

  const redirectTo404Page = () => {
    setRedirectTo404(true); // Set state to trigger redirection to 404 page
  };

  if (redirectToError) {
    return <ErrorPage />; // Render the ErrorPage component if redirectToError is true
  }

  if (redirectTo404) {
    return <NotFoundPage />; // Render the NotFoundPage component if redirectTo404 is true
  }

  return (
    <div className="repository-list-container">
      <div className="second_div">
        <div className="Testing_Error">
          <button onClick={redirectToErrorPage}>Test Error Page</button>
          <button onClick={redirectTo404Page}>Test 404 Page</button>
        </div>
        <h2>GitHub Repositories</h2>
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
