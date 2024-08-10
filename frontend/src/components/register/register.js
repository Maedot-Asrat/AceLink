import React from 'react';
import logo from '../../assets/Logo.png';
import './Register.css';

function Register() {
  return (
    <div className="register-page">
      <header className="register-header">
      <div className="logo">
          <img src={logo} alt="Logo" />
          <h4>Acelink</h4>
        </div>
        <div className="auth-buttons">
          <button className="auth-button">Log in</button>
          <button className="auth-button">Sign up</button>
        </div>
      </header>
      <div className="register-container">
        <div className="register-form">
          <h1>Register as A Student</h1>
          <p>Do you have an experience in tutoring? Come and join us</p>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Full Name" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="E-mail Address" />
            </div>
            <div className="form-group dual-input">
              <input type="password" placeholder="Password" />
              <input type="text" placeholder="Subject" />
            </div>
            <div className="form-group">
              <input type="tel" placeholder="Contact phone" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="year of experience" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Per session" />
            </div>
            <div className="form-group">
              <textarea placeholder="Write a brief paragraph about your experience"></textarea>
            </div>
            <div className="form-group">
              <button type="submit" className="submit-button">SUBMIT</button>
            </div>
            <div className="form-group checkbox-group">
              <input type="checkbox" id="contact" />
              <label htmlFor="contact">I want to be contacted by Ace-link</label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;