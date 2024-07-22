import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'google-login-react';

const YOUR_CLIENT_ID = '1024374663485-cgjq8t8pgcmvckach0plh71gohu55tud.apps.googleusercontent.com'; 

function Signup() {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleAgreeChange = (event) => {
    setIsAgreed(event.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Email and password validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Invalid email format");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    // Save user data to local storage
    const userData = { email, userName, password };
    localStorage.setItem(email, JSON.stringify(userData));

    // Simulate a successful registration
    setIsRegistered(true);

    // After a delay, redirect to the login page
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Adjust the delay as needed
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    // Get the user's profile information
    const profile = response.profileObj;
    const email = profile.email;
    const name = profile.name;
    // Redirect to the success page
    navigate('/success', { state: { email, name } });
    console.log("hi")
  };

  const handleGoogleLoginFailure = (response) => {
    console.log(response);
    // Handle the error
  };

  return (
    <div className="container1">
      {isRegistered && (
        <div className="success-message">
          <p>Registered successfully! Redirecting to login page...</p>
        </div>
      )}
      <h1>Create your new account</h1>
      <p>Create an account to start looking for the food you like</p>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <div className="input-group password-container">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <span className="password-eye">
              <i className={showPassword ? "fas fa-eye" : "fas fa-eye-slash"} onClick={togglePasswordVisibility} />
            </span>
          </div>
        </div>
        <div className="input-group terms-container">
          <label className="terms-label">
            <input
              type="checkbox"
              id="agree"
              checked={isAgreed}
              onChange={handleAgreeChange}
            />
            I Agree with{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
          </label>
        </div>
        <button type="submit" disabled={!isAgreed}>
          Register
        </button>
      </form>
      <div className="or-separator">
        <hr />
        <span>Or sign in with</span>
        <hr />
      </div>
      <div className="google-button-container">
        <GoogleLogin
          clientId={YOUR_CLIENT_ID}
          redirectUri = "https://foodapp-using-react.netlify.app"
          onSuccess={handleGoogleLoginSuccess}
          onFailure={handleGoogleLoginFailure}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button
              type="button"
              className="google-button"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <img
                src="/images/google-icon.png"
                alt="Google"
                style={{
                  borderRadius: '50%',
                  border: '1px solid black',
                  padding: '5px',
                }}
              />
            </button>
          )}
        />
      </div>
      <p className="register-link">
        Have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
}

export default Signup;
