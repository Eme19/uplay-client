import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import ProfileImage from "./ProfileImage";

function Profile() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <>
      {isLoggedIn > 0 && (
        <div>
           <ProfileImage/> 

          <h2>{user.username}</h2>
          <p>{user.country}</p>
          <p>{user.state}</p>
          <div>
            <button onClick={logOutUser}>Logout</button>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <>
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Login</Link>
        </>
      )}
    </>
  );
}

export default Profile;
