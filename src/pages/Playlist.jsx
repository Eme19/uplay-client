import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Card, Col, Avatar, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import "./Playlist.css";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const [error, setError] = useState(null);
  const {  isLoggedIn, isLoading, setIsLoading } = useContext(
    AuthContext
  );

  const storedToken =localStorage.getItem("authToken")

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const { playlistId } = useParams();

  useEffect(() => {
    api
      .get("/api/playlist/all")
      .then((response) => {
        setPlaylists(response.data.all);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  const handlDelectPlaylist = async (playlistId) => {
    try {
      const response = await api.delete(`/api/playlist/${playlistId}`);
      message.success("Playlist deleted");
      console.log("API Response:", response.data);
      setPlaylists((prevplaylists) =>
        prevplaylists.filter((playlist) => playlist._id !== playlistId)
      );
    } catch (error) {
      setError(error.message || 'An error occurred while deleting playlist.');
      message.error('An error occurred while deleting playlist.');
    }
  };

  return (
    <>
      {isLoggedIn > 0 && (
        <>
          <div>
            <div className="edi-playlist-style ">
              <Link to="/create/playlist" className="create-playlist-link">
                <Avatar
                  icon={<PlusCircleOutlined style={{ fontSize: "32px" }} />}
                  size={100}
                  style={{
                    backgroundColor: "",
                    marginRight: "8px",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Create a New Playlist
                </Avatar>
              </Link>
            </div>
<div className="playlist-style-flex">
{playlists.map((playlist) => (
              <Col span={7} key={playlist._id}>
                <Link to={`/playlist/${playlist._id}`}>
                  <Card
                    hoverable
                    title={playlist.name}
                    style={{ margin: 5 }}
                    cover={<  img  className="image-style" alt="" src={playlist.image} />}
                  >
                    <p className="playlist-p">Description: {playlist.description}</p>
                  </Card>
                </Link>
                <button
                  type="danger"
                  onClick={() => handlDelectPlaylist(playlist._id)}
                >
                  Delete
                </button>
              </Col>
            ))}
</div>
           
          </div>
        </>
      )}
    </>
  );
}

export default Playlist;








