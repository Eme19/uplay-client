import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoPlaySharp, IoPauseSharp } from 'react-icons/io5';
import { BsMusicNoteBeamed } from 'react-icons/bs';
import './AudioPlayer.css';

const API_URL = 'http://localhost:5005';

const AudioPlayer = ({ trackId }) => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/audio/${trackId}`);
        if (response.data && response.data.audioUrl) {
          setAudioUrl(response.data.audioUrl);
          setIsPlaying(true); // Autoplay audio
        } else {
          setError('Audio URL not found.');
        }
      } catch (error) {
        console.error('Error fetching audio URL:', error);
        setError('Error loading audio. Please try again later.');
      }
    };

    fetchAudioUrl();
  }, [trackId]);

  const playAudio = () => {
    if (audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioUrl) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="audio-player">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <div className="audio-info">
            <div className="audio-image">
              {trackId && trackId.Imagemp ? (
                <img src={trackId.Imagemp} alt="audio avatar" height={200} />
              ) : (
                <div className="icon-wrapper">
                  <span className="audio-icon">
                    <BsMusicNoteBeamed />
                  </span>
                </div>
              )}
            </div>
            <div className="text">
              <p className="title">{trackId && trackId.title}</p>
              <p>{trackId && trackId.author}</p>
            </div>
          </div>
          <div className="controls">
            <button
              className="play-pause-button"
              onClick={isPlaying ? pauseAudio : playAudio}
            >
              {isPlaying ? (
                <IoPauseSharp alt="Pause" />
              ) : (
                <IoPlaySharp alt="Play" />
              )}
            </button>
          </div>
          {audioUrl ? (
            <audio ref={audioRef} src={audioUrl} controls />
          ) : (
            <p className="loading">Audio loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
