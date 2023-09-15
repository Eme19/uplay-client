import React, { useState, useEffect } from "react";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const API_URL = "http://localhost:5005";

function TrackList() {
  const { albumId } = useParams();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getTracksForAlbum = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/album/${albumId}`);
      if (
        response.data &&
        response.data.album &&
        response.data.album.track
      ) {
        setTracks(response.data.album.track);
      }
      setIsLoading(true);
    } catch (error) {
      console.error("Error", error);
    }
  };

  useEffect(() => {
    getTracksForAlbum();
  }, [albumId]);

  if (!isLoading) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      
      {/* <h2>Tracks for Album ID: {albumId}</h2> */}
      <ul>
    
        {tracks.map((track) => (
          <li key={track._id}>
            
            <strong>Name:</strong> {track.name}<br />
            <strong>Artist:</strong> {track.artist}<br />
            <strong>Duration:</strong> {track.duration}<br />
            <strong>Track Number:</strong> {track.track_number}<br />
          
            <AudioPlayer trackId={track._id} />
            <div>
           
              <Link to={`/edit/track/${track._id}`}>
             
                <button className="edit-button">Edit Track</button>
              </Link>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrackList;
