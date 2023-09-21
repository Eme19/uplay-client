import React, { useState, useContext } from "react";
import axios from "axios";
import { Card, Col, Button, message } from "antd";
import { Link } from "react-router-dom";

import "./AlbumDetails.css";
import { AuthContext } from "../context/auth.context";

const AlbumDetail = ({ album, refreshAlbumList, onAddToLibrary }) => {
  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const deleteAlbum = async (albumId) => {
    try {
      const response = await api.delete(`/api/album/${albumId}`);
      console.log("Deleted", response.data);
      message.success("Album deleted successfully.");

      refreshAlbumList();
    } catch (error) {
      console.error("Error", error);
      message.error("An error occurred while deleting the album.");
    }
  };

  const handleAddToLibrary = async (albumId) => {
    setIsAddingToLibrary(true);
    try {
      const username = user.username;

      const userResponse = await api.get(`/library/username/${username}`);
      const userId = userResponse.data.user._id;

      const response = await api.post(`/library/add`, {
        userId,
        albumId,
      });

      console.log("Added to library", response);
      message.success("Added to library");

      onAddToLibrary(albumId);
    } catch (error) {
      console.error("Error adding to library", error);
      message.error("An error occurred while adding the album to your library.");
    } finally {
      setIsAddingToLibrary(false);
    }
  };

  return (
    <div  >
      <>
        {isLoggedIn > 0 && (
          <>
            <Col >
              <Link id="Link-style" to={`/album/${album._id}`}>
                <Card className="flex-style"
                 
                  style={{ width: 200, height: 300, margin: 10 }}
                >
                  <h3 className=""  style={{ textAlign: "center" }}>{album.title}</h3>

                  <div className="image-album">
                  <img  src={album.image} alt="" height={130} width={140} />
                  </div>
                 

                  <ul className="album-info">
                    <li className="li-style"><span>Total Tracks:</span> {album.total_tracks}</li>
                    <li className="li-style"><span>Release Date:</span> {album.release_date}</li>
                    <li className="li-style"><span>Genre:</span> {album.genre}</li>
                    <li className="li-style"><span>Popularity:</span> {album.popularity}</li>
                    <li className="li-style"><span> Artists:</span>
                      {album.artist.map((artist) => artist.name)}
                    </li  >
                    <li className="li-style"> <span>Album Type: </span>{album.album_type}</li>
                  </ul>
                </Card>
              </Link>
            </Col>
            <div className="add-to-library-button">
              <Button
                
                onClick={() => handleAddToLibrary(album._id)}
                loading={isAddingToLibrary}
                disabled={isAddingToLibrary}
              >
                {isAddingToLibrary ? "Adding..." : "Add to Library"}
              </Button>
            </div>


            <div  className="admin-edit-delet-button">
              <button
                className="delete-button"
                onClick={() => deleteAlbum(album._id)}
              >
                Delete from Library
              </button>
            </div>
            {/* <div  className="admin-edit-delet-button">
              <Link to={`/edit/album/${album._id}`}>
                <button className="edit-button">Edit Album</button>
              </Link>
            </div> */}
           
          </>
        )}
      </>
      <>
        {!isLoggedIn && (
          <>
            <div>
              <button
                className="delete-button"
                onClick={() => deleteAlbum(album._id)}
              >
                Delete from Library
              </button>
            </div>
            <div>
              <Link to={`/edit/album/${album._id}`}>
                <button className="edit-button">Edit Album</button>
              </Link>
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default AlbumDetail;







