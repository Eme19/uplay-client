import React, { useState, useEffect } from "react";
import axios from "axios";
import AlbumDetails from "./AlbumDetailsApi"; 

const API_URL = "http://localhost:5005";

function AlbumApi() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/spotify/album`)
      .then((response) => {
        console.log("API Response:", response.data)
        setAlbums(response.data); // Use response.data here
      })
      .catch((error) => {
        console.error("Error fetching albums:", error);
      });
  }, []);

  // Check if albums is empty or not loaded yet
  if (albums.length === 0) {
    return <div>Loading...</div>;
  }
  
console.log("show album",albums )

  return (
    <div>
      <h2>Album Details</h2>
      <p>Album Type: {albums.album_type}</p>
      <p>Artists:</p>
      <ul>
        {albums.artists.map((artist) => (
          <li key={artist.id}>{artist.name}</li>
        ))}
      </ul>
      <p>Album Images:</p>
      <div>
        {albums.images.map((image, index) => (
          <img key={index} src={image.url} alt={`Image ${index}`} />
        ))}
      </div>
      <p>
        More details: <a href={albums.external_urls.spotify}>Spotify</a>
      </p>
    </div>
  );
}

export default AlbumApi;
