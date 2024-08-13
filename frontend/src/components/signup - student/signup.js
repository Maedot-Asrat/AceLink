import React from 'react';
import logo from '../../assets/Logo.png';
import signupImg from '../../assets/signup.png';
import './signup.css';

const Signup = () => {
  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>Acelink</h2>
      </div>
      <div className="signup-box">
      <div className="right-side">
          <div className="image">
            <img src={signupImg} alt="Signup" />
          </div>
        </div>
        <div className='left-side'>
          <div className="signup-form">
            <h2 className="title">Register as a student</h2>
            <p>Let’s get you all set up so you can have the best experience in learning.</p>
            <div className="input-row">
              <input type="text" placeholder="First Name" value="Yohannes" className="input half-width" />
              <input type="text" placeholder="Last Name" value="Alemayehu" className="input half-width" />
            </div>
            <div className="input-row">
              <input type="email" placeholder="Email" value="john.doe@gmail.com" readOnly className="input half-width" />
              <input type="text" placeholder="Phone Number" value="+251940506544" className="input half-width" />
            </div>
            <input type="password" placeholder="Password" className="input full-width" />
            <input type="password" placeholder="Confirm Password" className="input full-width" />
            <div className="terms-and-register">
              <label>
                <input type="checkbox" className="checkbox" /> I agree to all the <a href="#" className="link">Terms</a> and <a href="#" className="link">Privacy Policies</a>
              </label>
              <a href="#" className="link">Register as a tutor</a>
            </div>
            <button className="button">Create account</button>
            <p>Already have an account? <a href="#" className="link">Login</a></p>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;
