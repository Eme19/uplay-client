import React, { useContext, useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Input } from "antd";
import avatarImage from "../assets/avatar.png";

const API_URL = "http://localhost:5005";

function ProfileImage() {
  const [showUpload, setShowUpload] = useState(false);
  const [image, setImage] = useState("");
  const { user, setUser, isLoggedIn } = useContext(AuthContext);

  const handleFileUpload = (e) => {
    const uploadData = new FormData();
    uploadData.append("image", e.target.files[0]);

    axios
      .post(`${API_URL}/api/upload`, uploadData)
      .then((response) => {
        setImage(response.data.image);
      })
      .catch((err) =>
        console.log("what image error is there to show now lol", err)
      );
  };

  const handleImgSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`${API_URL}/api/users`, { ...user, image })
      .then((response) => {
        setUser(response.data.updatedUser);
        setImage("");
      })
      .catch((err) =>
        console.log("user imageUpdate error :) show===> me lol", err)
      );
  };

  return (
    <>
      <div>
        {isLoggedIn && (
          <>
            <div>
              <Link to="/image/upload">
                {user && user.image ? (
                  <img
                    src={user.image}
                    alt={"profile_image"}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "75%",
                    }}
                  />
                ) : (
                  <img
                    src={avatarImage}
                    alt={"profile_image"}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "75%",
                    }}
                  />
                )}
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ProfileImage;









// import { useState } from "react";
// import { AuthContext } from "../context/auth.context";
// import React, { useContext } from "react";
// import axios from "axios";
// import { Input } from "antd";
// import avatarImage from "../assets/avatar.png";
// import { Link } from "react-router-dom";

// const API_URL = "http://localhost:5005";

// function ProfileImage() {
//   const [showUpload, setShowUpload] = useState(false);
//   const [image, setImage] = useState("");
//   const { user, setUser, isLoggedIn } = useContext(AuthContext);

//   const handleFileUpload = (e) => {
//     const uploadData = new FormData();
//     uploadData.append("image", e.target.files[0]);

//     axios
//       .post(`${API_URL}/api/upload`, uploadData)
//       .then((response) => {
//         setImage(response.data.image);
//       })
//       .catch((err) =>
//         console.log("what image error is there to show now lol", err)
//       );
//   };

//   const handleImgSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .put(`${API_URL}/api/users`, { ...user, image })
//       .then((response) => {
//         setUser(response.data.updatedUser);
//         setImage("");
//       })
//       .catch((err) =>
//         console.log("user imageUpdate error :) show===> me lol", err)
//       );
//   };

//   return (
//     <>
//     <Link to="/image/upload">
//       <div>
      
//         {isLoggedIn && (
//           <>
//             <div>

            
//               {user && user.image ? (
//                  <img
//                  src={user.image}
//                  alt={"profile_image"}
//                  style={{ width: "50px", height: "50px", borderRadius: "75%" }}
//                />
//               ) : (
//                 <img
//                   src={avatarImage}
//                   alt={"profile_image"}
//                   style={{ width: "50px", height: "50px", borderRadius: "75%" }}
//                 />
//               )}
//               {!showUpload && (
//                 <button onClick={() => setShowUpload(!showUpload)}>
//                   Edit Photo
//                 </button>
//               )}
//             </div>
//             <div>
//               {showUpload && (
//                 <form onSubmit={handleImgSubmit} className="updateImageForm">
//                   <Input
//                     type="file"
//                     name="image"
//                     onChange={(e) => handleFileUpload(e)}
//                   />
//                   <button
//                     className="cancelEditButton"
//                     onClick={() => setShowUpload(!showUpload)}
//                   >
//                     Cancel Edit
//                   </button>
//                   <button type="submit">Save new profile image</button>
//                 </form>
//               )}
             
//             </div>
//           </>
//         )}
//       </div>
//        </Link>
//     </>
//   );
// }

// export default ProfileImage;
