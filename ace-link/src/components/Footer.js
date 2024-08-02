import React from 'react';
import './Footer.css';
import Logo from '../assets/Logo.png'; 
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="left">
          <img src={Logo} alt="" />
          <span>AceLink </span>
          <span> | </span>
          <span> Tutoring Made Easy</span>
        </div>
        <div className='center'>
       
          <nav className="footer-nav">
            <a href="#careers">Careers</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms & Conditions</a>
          </nav>
          <p>© 2024 AceLink Inc.</p>
        </div>
        <div className="right">
          <p>Send us your thoughts</p>
          <textarea name="message" id="message" placeholder='your message'></textarea>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
