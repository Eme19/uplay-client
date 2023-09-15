import React, { useState, useEffect } from "react";
import { Table, message, Button } from "antd";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";

const API_URL = "http://localhost:5005";

function Songs() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Artist",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Track Number",
      dataIndex: "track_number",
      key: "track_number",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => setSelectedSong(record)}>Play</Button>
      ),
    },
    {
      title: "Audio",
      key: "audio",
      render: (text, record) =>
        selectedSong && selectedSong._id === record._id ? (
          <AudioPlayer trackId={selectedSong._id} />
        ) : null,
    },
  ];

  const getallsongsDb = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/track`);
      if (response.data.tracks) {
        setSongs(response.data.tracks);
      }
    } catch (error) {
      console.error("Error", error);
      message.error(
        "Error while getting all songs from data ==> Tracks get route"
      );
    }
  };

  useEffect(() => {
    getallsongsDb();
  }, []);

  return (
    <div>
      <Table dataSource={songs} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Songs;
