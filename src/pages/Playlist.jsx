import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Card, Col } from "antd";

function Playlist() {
  const [playlists, setPlaylists] = useState([]);
  const { storedToken, isLoggedIn, isLoading, setIsLoading } = useContext(
    AuthContext
  );
  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });

  const { playlistId } = useParams();

  useEffect(() => {
    api.get("/api/all")
      .then((response) => {
        setPlaylists(response.data.all);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playlists:", error);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoggedIn > 0 && (
        <div>
          <Link to="/create/playlist">Create a New Playlist</Link>
          <div>
            {playlists.map((playlist) => (
              <Col span={6} key={playlist._id}>
    
                <Link to={`/playlist/${playlist._id}`}>
                  <Card
                    hoverable
                    title={playlist.name}
                    style={{ margin: 10 }}
                    cover={<img alt="" src={playlist.image} />}
                  >
                    <p>Description: {playlist.description}</p>
                  </Card>
                </Link>
              </Col>
            ))}
          </div>
          <br />
         
        </div>
      )}
    </>
  );
}

export default Playlist;








// import React, { useState, useEffect, useContext } from "react";
// import { Link, useParams } from "react-router-dom";
// import axios from "axios";
// import { AuthContext } from "../context/auth.context";
// import { Card , Col} from "antd";

// function Playlist() {
//   const [playlists, setPlaylists] = useState([]);
//   const { storedToken, isLoggedIn, isLoading, setIsLoading } = useContext(
//     AuthContext
//   );
//   const api = axios.create({
//     baseURL: "http://localhost:5005",
//     headers: {
//       Authorization: `Bearer ${storedToken}`, // Ensure that storedToken is a string
//     },
//   });

//   const { playlistId } = useParams();

//   useEffect(() => {
//     api
//       .get("/api/all")
//       .then((response) => {
//         setPlaylists(response.data.all);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching playlists:", error);
//       });
//   }, []);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <>
//       {isLoggedIn > 0 && (
//         <>
//           <div>

//           <Link to="/create/playlist">Create a New Playlist</Link>
//             {playlists.map((playlist) => (
              
//               <Card
//                 key={playlist._id}
//                 hoverable
//                 title={playlist.name}
//                 style={{ width: 230, height: 300, margin: 10 }}
//                 cover={<img alt="" src={playlist.image} />}
//               >
//                 <p>Description: {playlist.description}</p>
//               </Card>
          
//             ))}
//           </div>
         
//           <br />
//           <Link to={`/playlist/${playlistId}`}>View Playlist</Link>
//         </>
//       )}
//     </>
//   );
// }

// export default Playlist;
