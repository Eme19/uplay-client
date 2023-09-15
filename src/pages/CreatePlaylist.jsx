import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Input, Select, Button } from 'antd';
import { AuthContext } from "../context/auth.context";

const { Option } = Select;

const CreatePlaylist = ({ playlistId }) => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [selectedTrack, setSelectedTrack] = useState(''); // Change to a single selected track
  const [tracks, setTracks] = useState([]);
  const {  isLoggedIn } = useContext(AuthContext);

 const storedToken = localStorage.getItem("authToken")
 
  const api = axios.create({
    baseURL: "http://localhost:5005",
    headers: {
      Authorization: `Bearer ${storedToken}`, // Ensure that storedToken is a string
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const response = await api.get(`/api/track`);
        setTracks(response.data.tracks);
      } catch (err) {
        console.error('Error fetching tracks:', err);
      }
    };

    fetchTracks();
  }, []);

  const handleImageUpload = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);
    formData.append('name', name);
    formData.append('trackId', selectedTrack); // Use 'trackId' instead of 'trackIds'

    try {
      const response = await api.post(`/api/create`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Playlist created successfully.');
        navigate('/playlist');
      } else {
        toast.error('Error creating playlist. Please try again.');
      }
    } catch (err) {
      toast.error('Error creating playlist. Please try again.');
      console.error('Error creating playlist:', err);
    }
  };

  return (
    <div>
      <h2>Create Playlist</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Description:</label>
          <Input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
        <div>
          <label>Name:</label>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Select Track</label>
          <Select
            name="trackId"
            value={selectedTrack}
            onChange={(value) => setSelectedTrack(value)} // Update the selected track
            required
          >
            <Option value="">Select a track</Option>
            {tracks.map((track) => (
              <Option key={track._id} value={track._id}>
                {track.name} by {track.artist}
              </Option>
            ))}
          </Select>
        </div>

        <Button type="primary" htmlType="submit">
          Create Playlist
        </Button>
      </form>
    </div>
  );
};

export default CreatePlaylist;








// import React, { useState, useEffect, useContext } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { Input, Select, Button } from 'antd';
// import { AuthContext } from "../context/auth.context";




// const { Option } = Select;

// const CreatePlaylist = ({playlistId}) => {
//   const [description, setDescription] = useState('');
//   const [image, setImage] = useState(null);
//   const [name, setName] = useState('');
//   const [selectedTrack, setSelectedTrack] = useState(''); // Change to a single selected track
//   const [tracks, setTracks] = useState([]);
//   const { storedToken, isLoggedIn } = useContext(AuthContext); 
//   const api = axios.create({
//     baseURL: "http://localhost:5005",
//     headers: {
//       Authorization: `Bearer ${storedToken}`, // Ensure that storedToken is a string
//     },
//   });

//   const navigate = useNavigate();

//   useEffect(() => {
//     api
//       .get(`/api/track`)
//       .then((response) => {
//         setTracks(response.data.tracks);
//       })
//       .catch((err) => {
//         console.error('Error fetching tracks:', err);
//       });
//   }, []);

//   const handleImageUpload = (e) => {
//     const selectedImage = e.target.files[0];
//     setImage(selectedImage);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('description', description);
//     formData.append('image', image);
//     formData.append('name', name);
//     formData.append('trackId', selectedTrack); // Use 'trackId' instead of 'trackIds'

//     api
//       .post(`/api/create`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       .then((response) => {
//         toast.success('Playlist created successfully.');
//         navigate(`/playlist/${playlistId}`);
//       })
//       .catch((err) => {
//         toast.error('Error creating playlist. Please try again.');
//         console.error('Error creating playlist:', err);
//       });
//   };

//   return (
//     <div>
//       <h2>Create Playlist</h2>

//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Description:</label>
//           <Input
//             type="text"
//             name="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Image:</label>
//           <Input
//             type="file"
//             name="image"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />
//         </div>
//         <div>
//           <label>Name:</label>
//           <Input
//             type="text"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Select Track</label>
//           <Select
//             name="trackId"
//             value={selectedTrack}
//             onChange={(value) => setSelectedTrack(value)} // Update the selected track
//             required
//           >
//             <Option value="">Select a track</Option>
//             {tracks.map((track) => (
//               <Option key={track._id} value={track._id}>
//                 {track.name} by {track.artist}
//               </Option>
//             ))}
//           </Select>
//         </div>

//         <button type="submit">Create Playlist</button>
//       </form>
//     </div>
//   );
// };

// export default CreatePlaylist;















