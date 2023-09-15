import React, { useState, useEffect } from "react";
import { Table, message, Button, Popconfirm } from "antd";
import axios from "axios";
import AudioPlayer from "../components/AudioPlayer";
import { Link } from "react-router-dom";
import "./Songs.css"

function Songs() {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState(null);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

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
        <>
          <Button onClick={() => setSelectedSong(record)}>Play</Button>
          <Popconfirm
            title="Are you sure you want to delete this song?"
            onConfirm={() => handleDeleteTrack(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger">Delete</Button>
          </Popconfirm>
          <Link to={`/edit/track/${record._id}`}>Edit Track</Link>
        </>
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
      const response = await api.get(`/api/track`);
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

  const handleDeleteTrack = async (trackId) => {
    try {
      const response = await api.delete(`/api/track/${trackId}`);
      message.success("Song deleted");
      console.log("API Response:", response.data);

      setSongs((prevSongs) => prevSongs.filter((song) => song._id !== trackId));
    } catch (error) {
      setError(error.message || "An error occurred while deleting song.");
      message.error("An error occurred while deleting song.");
    }
  };

  return (
    <div>
      <Table dataSource={songs} columns={columns} rowKey="_id" />
    </div>
  );
}

export default Songs;







// import React, { useState, useEffect } from "react";
// import { Table, message, Button, Popconfirm } from "antd";
// import axios from "axios";
// import AudioPlayer from "../components/AudioPlayer";
// import { Link } from "react-router-dom";

// function Songs() {
//   const [songs, setSongs] = useState([]);
//   const [selectedSong, setSelectedSong] = useState(null);
//   const [error, setError] = useState(null);

//   const storedToken = localStorage.getItem("authToken");

//   const api = axios.create({
//     baseURL: "http://localhost:5005",
//     headers: {
//       Authorization: `Bearer ${storedToken}`,
//     },
//   });

//   const columns = [
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Artist",
//       dataIndex: "artist",
//       key: "artist",
//     },
//     {
//       title: "Duration",
//       dataIndex: "duration",
//       key: "duration",
//     },
//     {
//       title: "Track Number",
//       dataIndex: "track_number",
//       key: "track_number",
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (text, record) => (
//         <>
//           <Button onClick={() => setSelectedSong(record)}>Play</Button>
//           <Popconfirm
//             title="Are you sure you want to delete this song?"
//             onConfirm={() => handleDeleteTrack(record._id)}
//             okText="Yes"
//             cancelText="No"
//           >
//             <Button type="danger">Delete</Button>
//           </Popconfirm>
//           <Link to={`/edit/track/${record._id}`}>Edit Track</Link>
//         </>
//       ),
//     },
//     {
//       title: "Audio",
//       key: "audio",
//       render: (text, record) =>
//         selectedSong && selectedSong._id === record._id ? (
//           <AudioPlayer trackId={selectedSong._id} />
//         ) : null,
//     },
//   ];

//   const getallsongsDb = async () => {
//     try {
//       const response = await api.get(`/api/track`);
//       if (response.data.tracks) {
//         setSongs(response.data.tracks);
//       }
//     } catch (error) {
//       console.error("Error", error);
//       message.error(
//         "Error while getting all songs from data ==> Tracks get route"
//       );
//     }
//   };

//   useEffect(() => {
//     getallsongsDb();
//   }, []);

//   const handleDeleteTrack = async (trackId) => {
//     try {
//       const response = await api.delete(`/api/track/${trackId}`);
//       message.success("Song deleted");
//       console.log("API Response:", response.data);

//       setSongs((prevSongs) => prevSongs.filter((song) => song._id !== trackId));
//     } catch (error) {
//       setError(error.message || "An error occurred while deleting song.");
//       message.error("An error occurred while deleting song.");
//     }
//   };

//   return (
//     <div>
//       <Table dataSource={songs} columns={columns} rowKey="_id" />
//     </div>
//   );
// }

// export default Songs;
