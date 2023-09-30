import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import AdminDashboard from '../pages/AdminDashboard';


const AdminComponent = () => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.get('/auth/admin');
      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setMessage('');
      setError('Access Denied. You must be an admin.');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={handleClick}>Access Admin-Protected Endpoint</button>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}

      <Link to="/admin/dashboard">Go to Admin Dashboard</Link>
    </div>
  );
};

export default AdminComponent;












// import { useContext, useEffect } from "react";
// import { AuthContext } from "../context/auth.context";
// import { useNavigate } from "react-router-dom";

// function IsAdminRoute({ children }) {
//   const { user } = useContext(AuthContext);
 

//   const { isLoggedIn, isLoading } = useContext(AuthContext);
//  const navigate = useNavigate()
//   // If the authentication is still loading 
//   if (isLoading) return <p>Loading ...</p>;
 
 

//   if (!isLoggedIn) {
//   // If the user is not logged in 
//      navigate("/login")
//   } else {
//   // If the user is logged in, allow to see the page 
//     return children;
//   }
// }



//   useEffect(() => {
//     // Log the user object for debugging purposes
//     console.log("User Object:", user);

//     // Check if the user is an admin
//     if (user && user.role === "admin") {
//       console.log("User is an admin. Allow access.");
//     } else {

//       console.log("User is not an admin. Redirecting to home.");
//       navigate("/");
//     }
//   }, [user, navigate]);

//   // Render children only if user is an admin
//   return user && user.role === "admin" ? children : null;
// }

// export default IsAdminRoute;
