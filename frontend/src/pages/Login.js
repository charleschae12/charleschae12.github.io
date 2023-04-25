import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../components/Logo.png';
import backgroundImage from '../image/login.png';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';
import { useUser } from '../components/UserContext';

const Login = () => {
  // Declare state variables for user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Declare state variable for error handling
  const [error, setError] = useState('');
  // Get setAuthData function from the AuthContext
  const { setAuthData } = useAuth();
  // Get setUser function from the UserContext
  const { setUser } = useUser();
  // Declare navigate function for routing
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log('Email:', email, 'Password:', password);

    // Validate input fields
    if (!email || !password) {
      setError("Email and password fields are required");
      return;
    }

    // Send data to the server
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Store user data and redirect to the main application page
      setAuthData({ isLoggedIn: true, data: response.data });
      //console.log(response.data);
      setUser({ email: email }); // Set the user's email
      navigate('/');

    } catch (error) {
      console.error("Error during login:", error);
      // Handle login error
      if (error.response && error.response.status === 400) {
        setError("Incorrect email or password");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  // Render the login form
  return (
    <div className="login-page-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="login-container">
        <div className="header">
          <Link to="/" className="header-link">
            <img src={logo} alt="The Collectors Logo" className="logo" />
            <span className="header-text">The Collectors</span>
          </Link>
        </div>
        {/* Display error message */}
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          {/* Email input field */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password input field */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Log In</button>
        </form>
        {/* Link to the registration page */}
        <Link to="/Register">
          <button className="register-button">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
