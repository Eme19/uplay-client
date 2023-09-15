import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const API_URL = 'http://localhost:5005';

function EditTrack() {
  const { trackId } = useParams();
  const navigate = useNavigate();

  const [track, setTrack] = useState({
    name: '',
    duration: '',
    artist: '',
    track_number: '',
    filename: '',
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/track/${trackId}`)
      .then((response) => {
        const fetchedTrack = response.data.data; // Adjust here
        setTrack(fetchedTrack);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching track:', error);
        toast.error('Error fetching track:', error.message); // Adjust here
        setIsLoading(false);
      });
  }, [trackId]);

  function handleSubmit(e) {
    e.preventDefault();

    // Send a PUT request to update the track information
    axios
      .put(`${API_URL}/api/track/${trackId}`, track)
      .then(() => {
        toast.success('Track updated successfully.');
        navigate(`/track/${trackId}`);
      })
      .catch((error) => {
        console.error('Error updating track:', error);
        toast.error('Error updating track:', error.message); // Adjust here
      });
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setTrack({ ...track, [name]: value });
  }

  return (
    <div>
      <h2>Edit Track</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={track.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="duration">Duration:</label>
            <input
              type="text"
              id="duration"
              name="duration"
              value={track.duration}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="artist">Artist:</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={track.artist}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="track_number">Track Number:</label>
            <input
              type="text"
              id="track_number"
              name="track_number"
              value={track.track_number}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="filename">Filename:</label>
            <input
              type="text"
              id="filename"
              name="filename"
              value={track.filename}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Track</button>
        </form>
      )}
    </div>
  );
}

export default EditTrack;











// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const API_URL = 'http://localhost:5005';

// function EditTrack() {
//   const { trackId } = useParams();
//   const navigate = useNavigate();

//   const [track, setTrack] = useState({
//     name: '',
//     duration: '',
//     artist: '',
//     track_number: '',
//     filename: '',
//   });

//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
    
//     axios
//       .get(`${API_URL}/api/track/${trackId}`)
//       .then((response) => {
//         console.log('Response from server', response.data);
//         const fetchedTrack = response.data.album.track
//         setTrack({
//           name: fetchedTrack.name,
//           duration: fetchedTrack.duration,
//           artist: fetchedTrack.artist,
//           track_number: fetchedTrack.track_number,
//           filename: fetchedTrack.filename,
//         });
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching track:', error);
//         toast.error('Error fetching track:', error);
//         setIsLoading(false);
//       });
//   }, [trackId]);

//   function handleSubmit(e) {
//     e.preventDefault();

//     // Send a PUT request to update the track information
//     axios
//       .put(`${API_URL}/api/track/${trackId}`, track)
//       .then(() => {
//         toast.success('Track updated successfully.');
//         navigate(`/track/${trackId}`);
//       })
//       .catch((error) => {
//         console.error('Error updating track:', error);
//         toast.error('Error updating track:', error);
//       });
//   }

//   function handleInputChange(e) {
//     const { name, value } = e.target;
//     setTrack({ ...track, [name]: value });
//   }

//   return (
//     <div>
//       <h2>Edit Track</h2>
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label htmlFor="name">Name:</label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={track.name}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="duration">Duration:</label>
//             <input
//               type="text"
//               id="duration"
//               name="duration"
//               value={track.duration}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="artist">Artist:</label>
//             <input
//               type="text"
//               id="artist"
//               name="artist"
//               value={track.artist}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="track_number">Track Number:</label>
//             <input
//               type="text"
//               id="track_number"
//               name="track_number"
//               value={track.track_number}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div>
//             <label htmlFor="filename">Filename:</label>
//             <input
//               type="text"
//               id="filename"
//               name="filename"
//               value={track.filename}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type="submit">Update Track</button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default EditTrack;
