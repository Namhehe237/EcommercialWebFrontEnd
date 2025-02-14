import React, { useState } from "react";
import "../../../style/RegisterPage/RegisterPage.css"; // Reuse the same CSS

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Validate email format
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user/forget-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.text();
      if (response.ok) {
        setSuccessMessage(data);
        setEmail(""); // Clear the email field on success
      } else {
        setErrorMessage(data);
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Forget Password</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your registered email"
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
        <div className="register-footer">
          <p>
            Remember your password?{" "}
            <a href="/user/login" className="link">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
