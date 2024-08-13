import React from 'react';
import logo from '../../assets/Logo.png';
import passwordImg from '../../assets/password.png';
import './setpassword.css';

const SetPassword = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>Acelink</h2>
      </div>
      <div className="set-password-box">
        <div className='left-side'>
          <div className="set-password-form">
            <h2 className="title">Set a password</h2>
            <p>Your previous password has been reseted. Please set a new password for your account.</p>
            <input type="password" placeholder="Create Password" className="input" />
            <input type="password" placeholder="Re-enter Password" className="input" />
            <button className="button">Set password</button>
          </div>
        </div>
        <div className="right-side">
          <div className="image">
            <img src={passwordImg} alt="Set Password" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetPassword;
