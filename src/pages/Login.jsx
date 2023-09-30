import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { ThemeContext } from "../context/theme.context";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "antd";
import axios from "axios";
import {  message } from "antd";
import "./Login.css"

const API_URL = process.env.REACT_APP_API_URL

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, storeToken, authenticateUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const navigate = useNavigate();

  const handleIdentifier = (e) => {
    setIdentifier(e.target.value);
  };
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const isEmail = identifier.includes("@");

    const loginData = {
      [isEmail ? "email" : "username"]: identifier,
      password: password,
    };

    axios
      .post(`${API_URL}/auth/login`, loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("===show me login details==>", response);
        console.log("Login Response:", response);
        storeToken(response.data.authToken);
        authenticateUser();
        console.log("User role:", response.data.user.role);
        if (response.data.user.role === "admin") {
          console.log("User is an admin");
          navigate("/admin/dashboard");
        } else {
          console.log("User is not an admin");
          navigate("/");
        }

        message.success("Successfully LoggedIn")
      })
      .catch((error) => {
        console.error("Login error:", error);
        message.error("Login failed. Please check your credentials.")
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={`login ${theme}`}>
     
      <h1>Login</h1>
<div className="login-flex">
      <form  onSubmit={handleLoginSubmit}>
      <div >
        <div>
          <label>Email or Username</label>
          <Input
            type="attribute"
            name="identifier"
            value={identifier}
            onChange={handleIdentifier}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
            required
          />
        </div>
        </div>
        <div id="btn-style-login">
          <button type="submit">Login</button>
        </div>
       
      </form>

      </div >
<div className="p-headup-style">
<p>Don't have an account yet?</p>
      <Link id="Link-styl-login" to="/signup"> Sign Up</Link>
</div>
      
    </div>
  );


}

export default Login;
