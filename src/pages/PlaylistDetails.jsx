


import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import "./PlaylistDetails.css"
import {  message } from "antd";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  

  const storedToken = localStorage.getItem("authToken")
  const api = axios.create({
    baseURL: 'http://localhost:5005',
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

const handlDelectPlaylist = async (playlistId) => {
  try{
    const response = await api.delete(`/api/playlist/${playlistId}`);
    message.success("Playlist deleted")
    console.log("API Response:", ); 
    setPlaylist((prevplaylist)=> prevplaylist.filter((playlist)=> playlist._id !== playlistId) );
  
  }catch (error) {
    setError(error.message || 'An error occurred while delecting playlist.');
  }
}


  const getPlaylist = async () => {
    try {
      const response = await api.get(`/api/playlist/${playlistId}`);
      const playlistData = response.data.getPlaylistByIdDB; 
      console.log("API Response:", playlistData); 
      setPlaylist(playlistData);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching the playlist.');
    }
  };


  useEffect(() => {
    getPlaylist();
  }, [playlistId]);

  if (error) {
    console.log("Error:", error); 
    return <div>Error: {error.message || 'An error occurred while fetching the playlist.'}</div>;
  }

  if (!playlist) {
    console.log("Loading..."); 
    return <div>Loading...</div>;
  }

  
  if (!playlist.track) { 
    console.log("No tracks available for this playlist."); 
    return <div>No tracks available for this playlist.</div>;
  }

  return (
    <div>
      <h2>Playlist Details</h2>

      <p>Name: {playlist.name}</p>
      <p>Description: {playlist.description}</p>

      <h3>Tracks</h3>
      <ul>
        {playlist.track.map((track) => (
          <li key={track._id}>
            <p>Track Name: {track.name}</p>
            <p>Duration: {track.duration} seconds</p>
            <p>Artist: {track.artist}</p>
            <p>Track Number: {track.track_number}</p>
            <audio controls>
              <source src={track.filename} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </li>
        ))}
      </ul>
     
      <Link to={`/edit/playlist/${playlistId}`}>Edit Playlist</Link>
    </div>
  );
};
export default PlaylistDetails;











