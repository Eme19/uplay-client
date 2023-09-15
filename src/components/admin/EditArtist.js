import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, message } from "antd";

const API_URL = "http://localhost:5005";

function EditArtist() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState({
    name: "",
    genre: "",
    image: "",
    popularity: 0,
  });

  const navigate =useNavigate()
  useEffect(() => {
    
    axios
      .get(`${API_URL}/api/artist/${artistId}`)
      .then((response) => {
        setArtist(response.data.artist);
      })
      .catch((error) => {
        console.error("Error fetching artist details:", error);
      });
  }, [artistId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArtist({
      ...artist,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   
    axios
      .put(`${API_URL}/api/artist/${artistId}`, artist)
      .then((response) => {
        console.log("Artist updated:", response.data.artist);
        message.success("artist updated")
        navigate("/artist")
      })
      .catch((error) => {
        console.error("Error updating artist:", error);
      });
  };

  return (
    <div>
      <h2>Edit Artist</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={artist.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Genre:</label>
          <Input
            type="text"
            name="genre"
            value={artist.genre}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Image URL:</label>
          <Input
            type="text"
            name="image"
            value={artist.image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Popularity:</label>
          <Input
            type="number"
            name="popularity"
            value={artist.popularity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Artist</button>
      </form>
    </div>
  );
}

export default EditArtist;
