import React from 'react';
import apple from '../../assets/apple.svg';
import facebook from '../../assets/facebook.svg';
import google from '../../assets/google.svg';
import logo from '../../assets/Logo.png';
import forgotPasswordImg from '../../assets/password.png';
import './forgotpassword.css';

const ForgotPassword = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>Acelink</h2>
      </div>
      <div className="forgot-password-box">
        <div className='left-side'>
          <div className="forgot-password-form">
            <a href="/loginStudent" className="back-link">← Back to login</a>
            <h2 className="title">Forgot your password?</h2>
            <p>Don’t worry, happens to all of us. Enter your email below to recover your password.</p>
            <input type="email" placeholder="Email" value="john.doe@gmail.com" className="input" />
            <button className="button">Submit</button>
            <div className="or-login-with">
              <p>-----   Or login with   -----</p>
              <div className="social-login-buttons">
                <button className="social-button facebook"><img src={facebook}></img></button>
                <button className="social-button google"><img src={google}></img></button>
                <button className="social-button apple"><img src={apple}></img></button>
              </div>
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="image">
            <img src={forgotPasswordImg} alt="Forgot Password" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
