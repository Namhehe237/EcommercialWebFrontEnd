import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { Container, TextField, Button, Typography, Box, Alert } from "@mui/material";
import axios from "axios";

const ChangePasswordPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(""); 
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/user/login");
    } else {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.email) {
        setUserEmail(storedUser.email); // ✅ Pre-fill email from storage
      }
    }
  }, [isLoggedIn, navigate]);

  const handleChangePassword = async (event) => {
    event.preventDefault();
    
    // ✅ Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/user/change-password", {
        email: userEmail,
        oldPassword,
        newPassword,
      });

      setMessage(response.data.message);
      setError(""); // Clear any previous error messages
    } catch (error) {
      setMessage("");
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Change Password
        </Typography>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleChangePassword}>
          <TextField 
            fullWidth 
            label="Email" 
            type="email" 
            margin="normal" 
            value={userEmail} 
            disabled 
          />

          <TextField 
            fullWidth 
            label="Old Password" 
            type="password" 
            margin="normal" 
            value={oldPassword} 
            onChange={(e) => setOldPassword(e.target.value)} 
            required
          />

          <TextField 
            fullWidth 
            label="New Password" 
            type="password" 
            margin="normal" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required
          />

          <TextField 
            fullWidth 
            label="Confirm Password" 
            type="password" 
            margin="normal" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />

          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            type="submit" 
            sx={{ mt: 2 }}
          >
            Change Password
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ChangePasswordPage;
