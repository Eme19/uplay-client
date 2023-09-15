import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row } from "antd";
import { toast } from "react-toastify";
import AlbumDetail from "./AlbumDetails";
import { AuthContext } from "../context/auth.context";
import "./AlbumList.css"
import SearchBar from "./SearchBar";

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken, isLoggedIn } = useContext(AuthContext); // Added isLoggedIn

  const api = axios.create({
    baseURL:process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${storedToken}`, 
    },
  });

  const getAlbums = async () => {
    try {
      const response = await api.get(`/api/album`);
      if (response.data && response.data.albums) {
        console.log("what's in the album list", response.data.albums);
        setAlbums(response.data.albums);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const refreshAlbumList = () => {
    console.log("Refreshing all album list...");
    getAlbums();
  };

  useEffect(() => {
    getAlbums();
  }, []);

  const handleAddToLibrary = (albumId) => {

    console.log("Adding album to library:", albumId);
  };

  return (
    <>
    <div id="search-albmStyle"> 
    <SearchBar/>
    </div>
  
   
    <div className="albumlist-header">
  
      {isLoading ? (
        <div>Loading...</div>
      ) : (
       
        isLoggedIn > 0 && (
          <Row gutter={16}>
            {albums.map((album) => (
              <AlbumDetail
                key={album._id}
                album={album}
                refreshAlbumList={refreshAlbumList} onAddToLibrary={handleAddToLibrary}
              />
            ))}
          </Row>
        )
      )}
    </div>
    </>
  );
}

export default AlbumList;






