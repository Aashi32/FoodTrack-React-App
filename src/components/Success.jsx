import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";
import { Link } from "react-router-dom";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, name } = location.state || {}; // Handle case where state might be undefined

  useEffect(() => {
    console.log("Location State:", location.state);
    if (!email || !name) {
      // Redirect to login if email or name is not available
      navigate("/login");
    }
  }, [location, navigate, email, name]);


  const handleGoToTracking = () => {
    console.log("Navigating to tracking screen");
    navigate("/tracking");
  };


  return (
    <div className="success-container">
      <div className="success-content">
        <div className="success-icon">
          <img src="/images/Success-page.png" alt="Success Icon" />
        </div>
        <p className="success-message">
          Successfully logged in as {name}!
        </p>
        <button className="button-success" onClick={handleGoToTracking}>
          Go to Tracking Screen
        </button>
        <Link to="/" className="button1">
          Logout
        </Link>
      </div>
    </div>
  );
}

export default Success;

