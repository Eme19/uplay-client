import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from "../context/theme.context";
import { AuthContext } from "../context/auth.context";
import logoImage from '../assets/logo3.png';
import ProfileImage from '../pages/ProfileImage';
import "./NavBar.css"





function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { isLoggedIn , user } = useContext(AuthContext);


  

  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-dark bg-black`}>
    
{isLoggedIn && (
  <div className='Nav-flex'><ProfileImage /><Link to="./profile"> {user.username}</Link></div>
)} 
      <Link to="/">
        <img className='logo-img' alt='logo' src={logoImage} />
      </Link>
      {/* <label className="ml-3">Theme <button className={`theme-btn ${theme}`} onClick={toggleTheme}>{theme === "light" ? "🌞": "🌙"}</button></label> */}
</nav>

    </>
  )
}

export default Navbar;
