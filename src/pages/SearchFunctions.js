import React, { useState } from "react";
import SearchBar from "./SearchBar";

function App() {

  const [searchResults, setSearchResults] = useState([]);

  
  const handleSearch = (results) => {
    setSearchResults(results);
  };

  return (
    <div className="App">
      <h1>Music Search</h1>
      <SearchBar onSearch={handleSearch} />
      <h2>Search Results:</h2>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
