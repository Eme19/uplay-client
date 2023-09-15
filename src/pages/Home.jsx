import React, { useContext } from "react";
import { ThemeContext } from "../context/theme.context";
import { Link } from "react-router-dom";
import logoImage2 from "../assets/logo-uplay2.png";
import { AuthContext } from "../context/auth.context";
import backgroundImag from "../assets/background-2";
import MusicHome from "./MusicHome";
import "./Home.css";
import SearchBar from "./SearchBar";

function Home() {
  const { theme } = useContext(ThemeContext);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      {isLoggedIn > 0 && (
        <>
          <SearchBar />
          <MusicHome />
          <h2>Recently Added</h2>
        </>
      )}
      {!isLoggedIn && (
        <div
          style={{
            backgroundImage: `url(${backgroundImag})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: 550,

          }}
        >
          <ul className={`home-list ${theme}`}>
            <li>Play your favorite songs</li>
            <li>Build your playlist</li>
            <li>Share with your friends</li>
          </ul>
          <Link to="/admin" className={`btn btn-primary`}>
            Admin Page
          </Link>
          <br></br>
          <Link to="/signup" className={`btn btn-primary ${theme}`}>
            Sign Up
          </Link>
          <Link to="/login" className={`btn btn-secondary ${theme}`}>
            Login
          </Link>
        </div>
      )}
    </>
  );
}

export default Home;

// import React, { useContext } from "react";
// import { ThemeContext } from "../context/theme.context";
// import { Link } from "react-router-dom";
// import logoImage2 from "../assets/logo-uplay2.png";
// import { AuthContext } from "../context/auth.context";
// import backgroundImag from "../assets/background-2";
// import MusicHome from "./MusicHome";
// import "./Home.css";

// function Home() {
//   const { theme } = useContext(ThemeContext);
//   const { isLoggedIn } = useContext(AuthContext);

//   return (
//     <>
//       <div
//         className={`home ${theme} d-flex justify-content-center align-items-center homepage`}
//       ></div>
//       {isLoggedIn > 0 && <MusicHome />} :
//       {!isLoggedIn && (
//         <>
//           <header
//             style={{
//               backgroundImage: `url(${backgroundImag})`,
//               backgroundPosition: "center",
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "cover",
//               height: 550,
//               // width: 100,
//             }}
//           >
//             <ul className={`home-list ${theme}`}>
//               <li>Play your favorite songs</li>
//               <li>Build your playlist</li>
//               <li>Share with your friends</li>
//             </ul>

//             <Link to="/admin" className={`btn btn-primary`}>
//               Admin Page
//             </Link>
//             <br></br>

//             <Link to="/signup" className={`btn btn-primary ${theme}`}>
//               Sign Up
//             </Link>
//             <Link to="/login" className={`btn btn-secondary ${theme}`}>
//               Login
//             </Link>
//           </header>
//         </>
//       )}
//     </>
//   );
// }

// export default Home;
