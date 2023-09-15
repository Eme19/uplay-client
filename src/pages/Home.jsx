import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import { Button, Typography, Card, Row, Col } from "antd";
import {
  PlayCircleOutlined,
  BuildOutlined,
  ShareAltOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import logoImage2 from "../assets/logo-uplay2.png";
import { AuthContext } from "../context/auth.context";
import backgroundImag from "../assets/background-2";
import MusicHome from "./MusicHome";
import "./Home.css";
import SearchBar from "./SearchBar";
import axios from "axios";

const { Title, Text } = Typography;

function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [recentlyAddedAlbums, setRecentlyAddedAlbums] = useState([]);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  useEffect(() => {
    if (isLoggedIn) {
      api
        .get("/library/recently-added")
        .then((response) => {
          setRecentlyAddedAlbums(response.data.recentlyAddedAlbums);
          console.log("response.data.recentlyAddedAlbums", response.data.recentlyAddedAlbums);
        })
        .catch((error) => {
          console.error("Error fetching recently added albums:", error);
        });
    }
  }, [isLoggedIn]);


  const handleDeleteAlbum = (albumId) => {
    api
      .post(`/library/remove/${albumId}`) 
      .then((response) => {
        console.log("response", response)
          setRecentlyAddedAlbums((prevAlbums) =>
            prevAlbums.filter((album) => album._id !== albumId))
            console.log(`Album with ID ${albumId} deleted successfully.`);
       
      })
      .catch((error) => {
        console.error(`Error deleting album with ID ${albumId}:`, error);
      });
  };

  return (
    <>
      {isLoggedIn > 0 && (
        <>
        <div className="search-style">
        <SearchBar />
        </div>
        
          <MusicHome />
          <h2 >Recently Added</h2>
          <div className="home-flex-style">
        {/* <Row gutter={16}> */}
            {recentlyAddedAlbums.map((album) => (
           
              <Col key={album._id} span={6}>
                <Link to={`/album/${album._id}`}>
                  <Card
                 className="col-card-style"
                    title={album.title}
                    style={{ width: 170, height: 300, margin: 5 }}
                    // extra={
                    
                    //   <Button
                    //     type="danger"
                    //     icon={<DeleteOutlined />}
                    //     onClick={() => handleDeleteAlbum(album._id)}
                    //   >
                    //     Delete
                    //   </Button>
                    // }
                  >


                    <div>
                    <img
                      className="image-style"
                      src={album.image}
                      alt=""
                      style={{ maxWidth: '100%', maxHeight: '200px' }}
                    />
                    </div>
                  
<div className="libery-content">
<ul >
                      <li ><span  id="libery-li-style">Total Tracks:</span> {album.total_tracks}</li>
                      <li  ><span id="libery-li-style">Release Date:</span> {album.release_date}</li>
                      <li ><span id="libery-li-style">Genre:</span> {album.genre}</li>
                      <li > <span id="libery-li-style">Popularity:</span> {album.popularity}</li>
                      <li><span id="libery-li-style">
                      Artists: {album.artist.map((artist) => artist.name)}
                        </span></li>
                      <li> <span id="libery-li-style">Album Type:</span> {album.album_type}</li>
                    </ul>
</div>
                  
                  </Card>
                </Link>
              </Col>
              
            ))}
          {/* </Row> */}
       
          </div>
        </>
      )}
      {!isLoggedIn && (
        <div
          className="home-background"
          style={{
            backgroundImage: `url(${backgroundImag})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Title level={2} style={{ color: "white" }}>
            Play, Build, and Share Music
          </Title>
          <ul className="home-features">
            <li>
              <PlayCircleOutlined /> Play your favorite songs
            </li>
            <li>
              <BuildOutlined /> Build your playlist
            </li>
            <li>
              <ShareAltOutlined /> Share with your friends
            </li>
          </ul>

          <div className="home-buttons">
            <Link to="/admin">
              <Button type="primary">Admin Page</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary" className={`btn btn-primary ${theme}`}>
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button type="secondary" className={`btn btn-secondary ${theme}`}>
                Login
              </Button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;

