import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Row } from "antd";
import { toast } from "react-toastify";
import AlbumDetail from "./AlbumDetails";
import { AuthContext } from "../context/auth.context";

function AlbumList() {
  const [albums, setAlbums] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { storedToken, isLoggedIn } = useContext(AuthContext); // Added isLoggedIn

  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`, 
    },
  });

  const getAlbums = async () => {
    try {
      const response = await api.get(`/api/album`);
      if (response.data && response.data.albums) {
        console.log("what's in the album list", response.data.albums);
        setAlbums(response.data.albums);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const refreshAlbumList = () => {
    console.log("Refreshing album list...");
    getAlbums();
  };

  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div>
      <h4>Album List</h4>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
       
        isLoggedIn > 0 && (
          <Row gutter={16}>
            {albums.map((album) => (
              <AlbumDetail
                key={album._id}
                album={album}
                refreshAlbumList={refreshAlbumList}
              />
            ))}
          </Row>
        )
      )}
    </div>
  );
}

export default AlbumList;







// import React, { useState, useEffect , useContext} from "react";
// import axios from "axios";
// import { Row } from "antd";
// import { toast } from "react-toastify";
// import AlbumDetail from "./AlbumDetails";
// import { AuthContext } from "../context/auth.context";


// const API_URL = "http://localhost:5005";

// function AlbumList() {
//   const [albums, setAlbums] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   // const { storedToken } = useContext(AuthContext); 

//   // const api = axios.create({
//   //   baseURL: "http://localhost:5005",
//   //   headers: {
//   //     Authorization: `Bearer ${storedToken}`, // Ensure that storedToken is a string
//   //   },
//   // });



//   const getAlbums = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/album`);
//       if (response.data && response.data.albums) {
//         console.log("what's in the album list", response.data.albums);
//         setAlbums(response.data.albums);
//       }
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error", error);
//     }
//   };


//   const refreshAlbumList = () => {

//     console.log("Refreshing album list...");
//     getAlbums();
//   };


//   useEffect(() => {
//     getAlbums();
//   }, []);



//   return (
//     <div>
//       <h4>Album List</h4>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
        
//         <Row gutter={16}>
//           {albums.map((album) => (
//             <AlbumDetail key={album._id} album={album} refreshAlbumList={refreshAlbumList} />
//           ))}
//         </Row>
//         )}
    
    
//     </div>
//   );
// }

// export default AlbumList;
