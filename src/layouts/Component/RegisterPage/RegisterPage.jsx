import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import '../../../style/RegisterPage/RegisterPage.css'; // Import the CSS file

const RegisterPage = () => {
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate password (min 8 chars, 1 uppercase, 1 special char)
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateEmail(userDetails.email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (userDetails.password !== userDetails.confirmPassword) {
      setErrorMessage('Passwords do not match!');
      return;
    }

    if (!validatePassword(userDetails.password)) {
      setErrorMessage('Password must be at least 8 characters long, contain one uppercase letter, and one special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: userDetails.username,
          email: userDetails.email,
          password: userDetails.password,
        }),
      });

      const data = await response.text();
      if (response.ok) {
        setSuccessMessage(data);
        setUserDetails({ username: '', email: '', password: '', confirmPassword: '' });
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Sign Up</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={userDetails.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userDetails.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="password-container">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />
              <button type="button" className="toggle-password" onClick={toggleConfirmPasswordVisibility}>
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="btn-primary">
            Sign Up
          </button>
        </form>
        <div className="register-footer">
          <p>
            Already have an account?{' '}
            <a href="/user/login" className="link">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
