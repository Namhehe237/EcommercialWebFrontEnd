import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn || !isLoggedIn) {
      // Logout logic
      setIsLoggedIn(false); // Update state to logged out
      navigate("/user/login"); // Redirect to the homepage
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          E-Commercial Website
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">
                About
              </a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="https://www.facebook.com/vuong.minion.3">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light ms-3"
                onClick={handleButtonClick}
              >
                {isLoggedIn ? "Logout" : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
