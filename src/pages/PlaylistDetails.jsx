import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [error, setError] = useState(null);
  const { storedToken } = useContext(AuthContext);
  const api = axios.create({
    baseURL: 'http://localhost:5005',
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const getPlaylist = async () => {
    try {
      const response = await api.get(`/api/playlist/${playlistId}`);
      setPlaylist(response.data);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching the playlist.');
    }
  };

  useEffect(() => {
    getPlaylist();
  }, [playlistId]);

  if (error) {
    return <div>Error: {error.message || 'An error occurred while fetching the playlist.'}</div>;
  }

  if (!playlist) {
    return <div>Loading...</div>;
  }

  // Check if playlist.tracks is defined before mapping
  if (!playlist.tracks) {
    return <div>No tracks available for this playlist.</div>;
  }

  return (
    <div>
      <h2>Playlist Details</h2>

      <p>Name: {playlist.name}</p>
      <p>Description: {playlist.description}</p>

      <h3>Tracks</h3>
      <ul>
        {playlist.tracks.map((track) => (
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
    </div>
  );
};

export default PlaylistDetails;
