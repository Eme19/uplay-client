import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AlbumDetailsApi() {
  // const [albumData, setAlbumData] = useState(null);

  // const { albumId } = useParams();

  // useEffect(() => {

  //   axios
  //     .get(`${API_URL}/spotify/album/${albumId}`)
  //     .then((response) => {
  //       setAlbumData(response.data);
  //       console.log("album innit", response.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching album details:", error);
  //     });
  // }, [albumId]);

  // if (!albumData) {
  //   return <p>Loading album details...</p>;
  // }

  // return (
  //   <div>
  //     <h2>{albumData.name}</h2>
  //     <p>Artist: {albumData.artists.map((artist) => artist.name).join(", ")}</p>
  //     <p>Release Date: {albumData.release_date}</p>
  //     <img src={albumData.images[0].url} alt={albumData.name} />
  //   </div>
  // );
}

export default AlbumDetailsApi;
