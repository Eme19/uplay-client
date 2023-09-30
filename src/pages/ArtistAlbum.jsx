import React, { useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

// const API_URL = process.env.REACT_APP_API_URL

function ArtistAlbums() {
  const { artistId } = useParams();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const {isLoggedIn } = useContext(AuthContext);
  
  const storedToken = localStorage.getItem("authToken")

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  useEffect(() => {
    api
      .get(`/api/artist/${artistId}/album`)
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
      {isLoggedIn > 0 && (

     
      <><h2>Artist Albums</h2><p>Artist ID: {artistId}</p><ul>
          {loading ? (
            <p>Loading albums...</p>
          ) : (
            albums?.map((album) => (
              <li key={album._id}>
                <div>
                  <strong>Title:</strong> {album.title}
                </div>
                <div>
                  <strong>Total Tracks:</strong> {album.total_tracks}
                </div>
                <div>
                  <strong>Genre:</strong> {album.genre}
                </div>
                <div>
                  <strong>Popularity:</strong> {album.popularity}
                </div>
              </li>
            ))
          )}
        </ul></> )}
    </div>
  );
}

export default ArtistAlbums;
