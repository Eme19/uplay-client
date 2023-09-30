import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import "./Profile.css"
import Home from "./Home"
import { Link, useParams } from "react-router-dom";
import { Button } from "antd";





function Profile() {
  const userId = useParams()
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="profile-flex-centering">
      {isLoggedIn > 0 && (
        <div>
          <p>{user.email}</p>
          <h2>{user.username}</h2>
          <p>{user.country}</p>
          <p>{user.state}</p>
          <div>
            <button onClick={logOutUser}>Logout</button>
          </div>
          {/* <Link to={`/edit/profile/${userId}`}>Edit Profile</Link> */}
        
        </div>
      )}
      {!isLoggedIn && (
        <>
          <Home/>
          {/* <div className="admin-styling">
          <Link to="/admin">
              <Button type="primary">Admin Page</Button>
            </Link>
          </div> */}
        </>
      )}
    </div>
  );
}

export default Profile;
