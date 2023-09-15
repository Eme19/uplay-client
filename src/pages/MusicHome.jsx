import React, { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
// import logoImage2 from "../assets/logo-uplay2.png";
// import Profile from "./Profile";
import { AuthContext } from "../context/auth.context";
import MusicLibery from "./MusicLibery";
import  "./MusicHome.css"




function MusicHome() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <header>
    
   
        {isLoggedIn > 0 &&
          (
            <div>
              <MusicLibery/>
              {/* <UserLibery/> */}
            </div>
          )}
    
        {!isLoggedIn && (
          <>


            <Link to="/signup" className={`btn btn-primary ${theme}`}>
              Sign Up
            </Link>
            <Link to="/login" className={`btn btn-secondary ${theme}`}>
              Login
            </Link> 
          </>
        )}
   
    </header>
  );
}

export default MusicHome;
