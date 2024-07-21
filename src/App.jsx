import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Tracking from './components/Tracking';
import Success from './components/Success';
import ForgotPassword from "./components/ForgotPassword";

const App = () => {
  return (
    <>
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tracking" element={<Tracking />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        
      </Routes>
    
    </>
  );
};


export default App;


