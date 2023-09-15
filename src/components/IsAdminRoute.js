import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth.context";
import { useNavigate } from "react-router-dom";

function IsAdminRoute({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Log the user object for debugging purposes
    console.log("User Object:", user);

    // Check if the user is an admin
    if (user && user.role === "admin") {
      console.log("User is an admin. Allow access.");
    } else {

      console.log("User is not an admin. Redirecting to home.");
      navigate("/");
    }
  }, [user, navigate]);

  // Render children only if user is an admin
  return user && user.role === "admin" ? children : null;
}

export default IsAdminRoute;
