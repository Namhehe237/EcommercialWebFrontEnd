import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Avatar,
  Button,
  Box,
  Divider,
} from "@mui/material";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/user/login");
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Website Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          E-Commercial Website
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          <Button color="inherit" component={Link} to="/products">
            Products
          </Button>
          <Button color="inherit" component={Link} to="/">
            About
          </Button>
          <Button color="inherit" component={Link} to="https://www.facebook.com/vuong.minion.3">
            Contact Us
          </Button>
        </Box>

        {/* Avatar/Menu when Logged In */}
        {isLoggedIn ? (
          <>
            <IconButton onClick={handleMenuOpen} sx={{ ml: 2 }}>
              <Avatar alt="User" src="/images/user-avatar.png" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem disabled>Welcome</MenuItem>
              <Divider />
              <MenuItem onClick={() => navigate("/user/change-password")}>
                Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/user/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
