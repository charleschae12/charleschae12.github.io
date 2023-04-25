import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import logo from '../components/Logo.png';
import backgroundImage from '../image/Register.png';
import axios from 'axios';

const Register = () => {
  // Declare state variables for user input
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rcsid, setRcsid] = useState('');
  // Declare navigate function for routing
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (rcsid.match(/^\d/)) { // check if rcsid starts with a number
      alert('RCSID cannot start with a number');
      return;
    }

    if (email !== confirmEmail) {
      alert('Emails do not match');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      alert('Password should be at least 6 characters');
      return;
    }

    // Log user input for debugging
    console.log('Email:', email, 'Confirm Email:', confirmEmail, 'Password:', password, 'Confirm Password:', confirmPassword, 'RCSID:', rcsid);

    // Send data to the server
    try {
      const response = await axios.post("http://localhost:8000/api/register", {
        rcsid,
        email,
        password,
      });

      // Handle server response
      if (response.status === 200) {
        // Show a success message or redirect to the login page
        alert("Registration successful! Please log in.");
        navigate('/login');
      } else {
        // Handle registration error
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }

  };


  return (
    <div className="register-page-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="register-container">
        <div className="header">
          <Link to="/" className="header-link">
            <img src={logo} alt="The Collectors Logo" className="logo" />
            <span className="header-text">The Collectors</span>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="rcsid">RCSID</label>
            <input
              type="text"
              id="rcsid"
              value={rcsid}
              onChange={(e) => setRcsid(e.target.value)}
              required
            />
            {rcsid.match(/^\d/) && (
              <span className="warning-message">RCSID cannot start with a number</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmEmail">Confirm Email</label>
            <input
              type="email"
              id="confirmEmail"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
            {email !== confirmEmail && confirmEmail !== '' && (
              <span className="warning-message">Emails do not match</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {password.length < 6 && (
              <span className="warning-message">Password should be at least 6 characters</span>
            )}
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {password !== confirmPassword && confirmPassword !== '' && (
              <span className="warning-message">Password do not match</span>
            )}
          </div>
          <button type="submit">Register</button>
        </form>
        <Link to="/Login" className="back-button">Back</Link>
      </div>
    </div>
  );
};

export default Register;
