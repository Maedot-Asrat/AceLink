import React from 'react';
import './Header.css';
import Logo from '../assets/Logo.png'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} className="logo_img" alt="Logo" />
        <h3>Acelink</h3>
        </div>
      <div className="right_bar">
      <nav className="nav">
        <a href="#home">Home</a>
        <a href="#feature">Feature</a>
        <a href="#about">About Us</a>
      </nav>
      <div className="auth-buttons">
        <button className="login-btn">Login</button>
        <button className="signup-btn">Sign Up</button>
      </div>
      </div>
    </header>
  );
};

export default Header;
