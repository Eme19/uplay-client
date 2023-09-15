import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/theme.context";
import { Input, message } from "antd";
import authMethods from "../components/apiservices/auth.servic";
import "./Signup.css";

function Signup() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    country: "",
    state: "",
  });

  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.includes("@")) {
      message.error("Email must contain '@' symbol.");
      return;
    }

    const passwordStrengthRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordStrengthRegex.test(form.password)) {
      message.error("Password must have at least 6 characters, including one digit, one lowercase letter, and one uppercase letter.");
      return;
    }

    try {
      const user = form;
      await authMethods.signUp(user);
      message.success("Successfully signed up!");
      navigate("/login");
    } catch (error) {
      message.error("Signup failed. Please check your credentials.");
      console.error(error);
    }
  };

  return (
    <div className={`signup ${theme}`}>
      <form onSubmit={handleSignupSubmit}>
        <h1>Sign Up</h1>
        <div className="inputstyle">
          <label>Username</label>
          <Input
            className="input-formstyle"
            type="text"
            name="username"
            value={form.username}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="inputstyle">
          <label>Email</label>
          <Input
            className="input-formstyle"
            type="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="inputstyle">
          <label>Password</label>
          <Input
            className="input-formstyle"
            type="password"
            name="password"
            value={form.password}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="inputstyle">
          <label>Country</label>
          <Input
            className="input-formstyle"
            type="text"
            name="country"
            value={form.country}
            onChange={handleFormChange}
            required
          />
        </div>

        <div className="inputstyle">
          <label>State</label>
          <Input
            className="input-formstyle"
            type="text"
            name="state"
            value={form.state}
            onChange={handleFormChange}
            required
          />
        </div>

        <div>
          <button className="btn-form" type="submit">
            Sign Up!
          </button>
        </div>
      </form>

      <p>Already have an account? <Link to="/login">Login here!</Link></p>
    </div>
  );
}

export default Signup;











