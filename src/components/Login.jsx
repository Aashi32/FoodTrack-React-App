import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";
import { GoogleLogin } from 'google-login-react';

const YOUR_CLIENT_ID = '1024374663485-cgjq8t8pgcmvckach0plh71gohu55tud.apps.googleusercontent.com'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
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

    // Retrieve user data from local storage
    const storedUserData = localStorage.getItem(email);
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      if (userData.password === password) {
        navigate('/success', { state: { email: userData.email, name: userData.userName } });
      } else {
        alert("Incorrect password");
      }
    } else {
      alert("User not found");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleLoginSuccess = (response) => {
    console.log(response);
    // Get the user's profile information
    const profile = response.profileObj;
    const email = profile.email;
    const name = profile.name;
    // Redirect to the success page
    navigate('/success', { state: { email, name } });
  };



  const handleGoogleLoginFailure = (response) => {
    console.log(response);
    alert('Google login failed');
    // Handle the error
  };

  return (
    <div className="container1">
      <h1>Login to your account.</h1>
      <p>Please sign in to your account</p>
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
        <div className="forgot-password-container">
          <Link to="/forgotpassword" className="forgot-password">
            Forgot password?
          </Link>
        </div>
        <button type="submit" className="button">
          Sign In
        </button>
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
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}

export default Login;
