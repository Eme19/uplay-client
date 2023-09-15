import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function EditTrack() {
  const { trackId } = useParams();
  console.log("trackId", trackId)
  const navigate = useNavigate();

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const [track, setTrack] = useState({
    name: '',
    duration: '',
    artist: '',
    track_number: '',
    filename: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/api/track/${trackId}`)
      .then((response) => {
        const fetchedTrack = response.data; 
        console.log("fetchedTrack",fetchedTrack)
        setTrack(fetchedTrack);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching track:', error);
        toast.error('Error fetching track:', error.message); 
        setIsLoading(false);
      });
  }, [trackId]);

  function handleSubmit(e) {
    e.preventDefault();

    
    api
      .put(`/api/track/${trackId}`, track)
      .then(() => {
        toast.success('Track updated successfully.');
        navigate(`/edit/track/${trackId}`);
      })
      .catch((error) => {
        console.error('Error updating track:', error);
        toast.error('Error updating track:', error.message); // Adjust here
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  }

  return (
    <div>
      <h2>Edit Track</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={track.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={track.duration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={track.artist}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="track_number">Track Number:</label>
            <input
              type="text"
              id="track_number"
              name="track_number"
              value={track.track_number}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="filename">Filename:</label>
            <input
              type="text"
              id="filename"
              name="filename"
              value={track.filename}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Track</button>
        </form>
      )}
    </div>
  );
}

export default EditTrack;










