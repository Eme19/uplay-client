import { useState } from "react";
import { AuthContext } from "../context/auth.context";
import React, { useContext } from "react";
import axios from "axios";
import { Input, Avatar } from "antd"; // Import Avatar from antd
import { Link } from "react-router-dom";
import avatarImage from "../assets/avatar.png";
import "./ProfileImage.css"

// const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5005";

function ProfileImage() {
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("");
  const { isLoggedIn, user, setUser } = useContext(AuthContext);

  const storedToken = localStorage.getItem("authToken");

  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    api
      .post(`/api/upload`, uploadData)
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((err) => console.log("Error uploading image:", err));
  };

  const handleDeleteImage = () => {
    api
      .delete(`/api/users/${user.username}/image`)
      .then((response) => {
        const updatedUser = { ...user, image: avatarImage };
        setUser(updatedUser);
      })
      .catch((err) => console.log("Error deleting user image:", err));
  };

  return (
    <>
      <div >
        {isLoggedIn && (
          <>
            <div>
              {user && user.image ? (
                <Link to={`/edit/profile`}>
                  <Avatar
                    className="image-style"
                    src={user.image}
                    alt={"profile_image"}
                    style={{
                      cursor: "pointer", 
                      width: "40px",
                      height: "40px",
                    
                    }}
                  />
                </Link>
              ) : (
                <Link to={`/edit/profile`}>
                  <Avatar
                    src={avatarImage}
                    alt={"profile_image"}
                    style={{
                      cursor: "pointer",
                      width: "45px",
                      height: "45px",
                    }}
                  />
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileImage;
