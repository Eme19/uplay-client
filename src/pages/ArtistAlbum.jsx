import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function ArtistAlbums() {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/artist/${artistId}/album`)
      .then((response) => {
        setAlbums(response.data.albums);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching artist albums:", error);
      });
  }, [artistId]);

  return (
    <div>
      <h2>Artist Albums</h2>
      <p>Artist ID: {artistId}</p>
      <ul>
        {loading ? (
          <p>Loading albums...</p>
        ) : (
          albums.map((album) => (
            <li key={album._id}>
              {album.title} - {album.release_date}
            </li>
          ))
        )}
      </ul>
      
    </div>
  );
}

export default ArtistAlbums;
