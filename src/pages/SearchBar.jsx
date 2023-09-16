









import React, { useState, useEffect } from "react";
import axios from "axios";
import { Input, Button, List } from "antd";
import { Link } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import "./SearchBar.css"

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/api/search?term=${searchTerm}&random=${Math.random()}`
      );
      if (response.status !== 200) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const data = response.data;
      console.log("response.data", data.data);
      setSearchResults(data.data);
      setError(null);

      if (typeof onSearch === "function") {
        onSearch(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, onSearch]);

  return (
    <div className="search-bar">
      <Input className="search-input"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        prefix={<SearchOutlined />}
      />

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
      
        {searchResults.tracks?.map((result) => {
          return <li>{result.artist}</li>;
        })}

        {searchResults.tracks?.map((result) => {
          return<Link to={`/track/${result._id}`}> <li>{result.artist}</li>
          </Link>
        })}

        {searchResults.album?.map((result) => {
          return (
            <ul>
          <Link to={`/album/${result._id}`} >  <li>{result.artist}</li> 
              <li>{result.name}</li></Link> 
            </ul>
          );
        })}

        {searchResults.artist?.map((result) => {
          return (
            <ul>

<Link to={`/artist/${result._id}`} > <li>{result.name}</li> </Link>
           
            </ul>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchBar;
