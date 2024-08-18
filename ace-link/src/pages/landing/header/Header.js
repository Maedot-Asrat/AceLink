// import React from 'react';
import './Header.css';
import Logo from '../../../assets/Logo.png'; 

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
        <a href='/loginStudent'><button className="login-btn">Login</button></a>
        <a href='/registerStudent'><button className="signup-btn">Sign Up</button></a>
      </div>
      </div>
    </header>
  );
};

export default Header;
