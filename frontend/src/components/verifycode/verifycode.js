import React from 'react';
import logo from '../../assets/Logo.png';
import verifyImg from '../../assets/login.png';
import './verifycode.css';

const VerifyCode = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>Acelink</h2>
      </div>
      <div className="verify-box">
        <div className='left-side'>
          <div className="verify-form">
            <a href="#" className="back-link">← Back to login</a>
            <h2 className="title">Verify code</h2>
            <p>An authentication code has been sent to your email.</p>
            <input type="text" placeholder="Enter Code" value="7789BM6X" className="input" />
            <p className="resend">
              Didn’t receive a code? <a href="#" className="link">Resend</a>
            </p>
            <button className="button">Verify</button>
          </div>
        </div>
        <div className="right-side">
          <div className="image">
            <img src={verifyImg} alt="Verify Code" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCode;
