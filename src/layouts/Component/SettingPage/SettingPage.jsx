import React, { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";
import {
  Container,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";

const SettingsPage = () => {
  const { user, updateUser } = useAuth(); // Get user data and update function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Ensure username is set when component loads
  useEffect(() => {
    if (user) {
      setUsername(user.username || "");
    }
  }, [user]);

  const handleSave = () => {
    if (!username.trim()) {
      alert("Username cannot be empty!");
      return;
    }

    // Update user information (keeping email fixed)
    const updatedUser = { ...user, username };
    updateUser(updatedUser);

    alert("User information updated successfully!");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            User Settings
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            {/* Username Field */}
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {/* Email Field (Read-only) */}
            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={user?.email || ""}
              InputProps={{
                readOnly: true,
              }}
            />

            {/* Password Field */}
            <TextField
              label="New Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Changes
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default SettingsPage;
