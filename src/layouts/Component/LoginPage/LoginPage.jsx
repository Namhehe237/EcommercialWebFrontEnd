import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from "../../../context/AuthContext"; // Import useAuth for state management
import "../../../style/LoginPage/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn } = useAuth(); // Use context to manage login state
  const navigate = useNavigate(); // Initialize navigate

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", {
        email,
        password,
      });
      setMessage("Login successful!");
      setIsLoggedIn(true); // Update login state in context
      navigate("/"); // Redirect to the homepage (http://localhost:3000)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setMessage("Invalid email or password");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          <button className="btn-primary" type="submit">
            Login
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
