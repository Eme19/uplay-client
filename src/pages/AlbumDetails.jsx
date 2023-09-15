import React, { useState, useContext } from "react";
import axios from "axios";
import { Card, Col, Button } from "antd";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./AlbumDetails.css";
import { AuthContext } from "../context/auth.context";

const AlbumDetail = ({ album, refreshAlbumList, onAddToLibrary }) => {
 

  const [isAddingToLibrary, setIsAddingToLibrary] = useState(false);
  const { user, storedToken, isLoggedIn } = useContext(AuthContext); 
  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`, // Ensure that storedToken is a string
    },
  });

  const deleteAlbum = async (albumId) => {
    try {
      const response = await api.delete(`/api/album/${albumId}`);
      console.log("Deleted", response.data);
      toast.success("Album deleted successfully.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });

      refreshAlbumList();
    } catch (error) {
      console.error("Error", error);
      toast.error("An error occurred while deleting the album.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    }
  };

  const handleAddToLibrary = async (albumId) => {
    setIsAddingToLibrary(true);
    try {
      const username = user.username;

      const userResponse = await api.get(`/api/username/${username}`);
      const userId = userResponse.data._id;

      const response = await api.post(`/api/add`, {
        userId,
        albumId,
      });

      console.log("Added to library", response.data);
      toast.success("Album added to your library.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });

      onAddToLibrary(albumId);
    } catch (error) {
      console.error("Error adding to library", error);
      toast.error("An error occurred while adding the album to your library.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: true,
      });
    } finally {
      setIsAddingToLibrary(false);
    }
  };

  return (
    <div>
      <>
      {isLoggedIn > 0 && (
      <><Col>
            <Link to={`/album/${album._id}`}>
              <Card
                title={album.title}
                style={{ width: 230, height: 300, margin: 10 }}
              >
                <img src={album.image} alt="" height={150} />

                <ul className="album-info">
                  <li>Total Tracks: {album.total_tracks}</li>
                  <li>Release Date: {album.release_date}</li>
                  <li>Genre: {album.genre}</li>
                  <li>Popularity: {album.popularity}</li>
                  <li>Artists: {album.artist.map((artist) => artist.name).join(", ")}</li>
                  <li>Album Type: {album.album_type}</li>
                </ul>
              </Card>
            </Link>
          </Col><div>
              <Button
                className="add-to-library-button"
                onClick={() => handleAddToLibrary(album._id)}
                loading={isAddingToLibrary}
                disabled={isAddingToLibrary}
              >
                {isAddingToLibrary ? "Adding..." : "Add to Library"}
              </Button>
            </div></>
      )}</>
      <>
      {!isLoggedIn  && (
      <><div>

            <button
              className="delete-button"
              onClick={() => deleteAlbum(album._id)}
            >
              Delete from Library
            </button>
          </div><div>
              <Link to={`/edit/album/${album._id}`}>
                <button className="edit-button">Edit Album</button>
              </Link>
            </div></>
     )}</>
    </div>
  );
};

export default AlbumDetail;










// import { Card, Col } from "antd";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./AlbumDetails.css";

// const AlbumDetail = ({ album, refreshAlbumList }) => {
//   const API_URL = "http://localhost:5005";

//   const deleteAlbum = async (albumId) => {
//     try {
//       const response = await axios.delete(`${API_URL}/api/album/${albumId}`);
//       console.log("Deleted", response.data);
//       toast.success("Album deleted successfully.", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: true,
//       });

      
//       refreshAlbumList();
//     } catch (error) {
//       console.error("Error", error);
//       toast.error("An error occurred while deleting album.", {
//         position: toast.POSITION.TOP_CENTER,
//         autoClose: true,
//       });
//     }
//   };

//   return (
//     <div>
//       <Col>
//         <Link to={`/album/${album._id}`}>
//         <Card
//                     title={album.title}
//                     style={{ width: 230, height: 300, margin: 10 }}
//                   >
//                     <img src={album.image} alt="" height={150} />
                 
//             <ul className="album-info">
//               <li>Total Tracks: {album.total_tracks}</li>
//               <li>Release Date: {album.release_date}</li>
//               <li>Genre: {album.genre}</li>
//               <li>Popularity: {album.popularity}</li>
//               <li>Artists: {album.artist.map((artist) => artist.name).join(', ')}</li>
//               <li>Album Type: {album.album_type}</li>
//             </ul>
//           </Card>
//         </Link>
//       </Col>

//       <div>
//       <button className="delete-button" onClick={() => deleteAlbum(album._id)}>
//         Delete from Library
//       </button>

      
//       </div>
//       <div>
//       <Link to={`/edit/album/${album._id}`}>
//           <button className="edit-button">Edit Album</button>
//         </Link>
//       </div>
     


//     </div>
//   );
// };

// export default AlbumDetail;
