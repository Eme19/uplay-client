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
    baseURL: process.env.REACT_APP_API_URL,
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
          console.log(
            "response.data.recentlyAddedAlbums",
            response.data.recentlyAddedAlbums
          );
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
        console.log("response", response);
        setRecentlyAddedAlbums((prevAlbums) =>
          prevAlbums.filter((album) => album._id !== albumId)
        );
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
          <h4>Recently Added</h4>
          <div className="home-flex-style">
            {recentlyAddedAlbums.map((album) => (
              <Col key={album._id}>
                <Link to={`/album/${album._id}`}>
                  <Card
                    className="col-card-style"
                    style={{ width: 200, height: 300, margin: 10 }}
                  >
                    <h2 className="" style={{ textAlign: "center" }}>
                      {album.title}
                    </h2>

                    <div className="image-style">
                      <img src={album.image} alt="" height={130} width={140} />
                    </div>

                    <div className="libery-content">
                      <ul>
                        <li>
                          <span>Total Tracks:</span> {album.total_tracks}
                        </li>
                        <li>
                          <span>Release Date:</span> {album.release_date}
                        </li>
                        <li>
                          <span>Genre:</span> {album.genre}
                        </li>
                        <li>
                          {" "}
                          <span>Popularity:</span> {album.popularity}
                        </li>
                        <li>
                          <span>
                            Artists: {album.artist.map((artist) => artist.name)}
                          </span>
                        </li>
                        <li>
                          {" "}
                          <span>Album Type:</span> {album.album_type}
                        </li>
                      </ul>
                    </div>
                  </Card>
                </Link>
                <div className="delete-button">
                  <Button
                    type="danger"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteAlbum(album._id)}
                  >
                    Delete
                  </Button>
                </div>
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
        
          <ul className="home-features">
            <li className="home-icon-style">
              <PlayCircleOutlined /> Play your favorite songs
            </li>
            <li className="home-icon-style">
              <BuildOutlined /> Build your playlist
            </li>
            <li className="home-icon-style">
              <ShareAltOutlined /> Share with your friends
            </li>
          </ul>

          <div className="home-buttons">
           
            <Link to="/signup">
              <button className={`btn btn-primary ${theme}`}>
                Sign Up
              </button>
            </Link>
            <Link to="/login">
              <button  className={`btn btn-secondary ${theme}`}>
                Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
