import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="container1">
      <h1>Forgot Password</h1>
      <p>Enter your email to receive a password reset link</p>
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
        <button type="submit" className="button">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
