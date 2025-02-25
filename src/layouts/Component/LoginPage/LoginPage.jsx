import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import "../../../style/LoginPage/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const { setIsLoggedIn, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/user/login", {
        email,
        password,
      });
  
      const userData = response.data; // ✅ Extract user details (id, username, email)
      localStorage.setItem("user", JSON.stringify(userData)); // ✅ Store in localStorage
  
      setIsLoggedIn(true);
      setUser(userData); // ✅ Update AuthContext with user info
  
      navigate("/"); // ✅ Redirect to homepage
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };
  
  
  
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button className="btn-primary" type="submit">Login</button>
        </form>

        <div className="additional-links">
          <button className="btn-secondary" onClick={() => navigate("/user/register")}>Register</button>
          <br></br>
          <button className="btn-link" onClick={() => navigate("/user/forgot-password")}>Forgot Password?</button>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
