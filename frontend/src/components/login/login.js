import React from 'react';
import loginimg from '../../assets/login.png';
import logo from '../../assets/Logo.png';
import './Login.css';


const Login = () => {
  return (
    <div className="container">
        <div className="logo">
            <img src={logo}></img>
            <h2>Acelink</h2>
        </div>
      <div className="login-box">
        <div className='left-side'>
        <div className="login-form">
          <h2 className="title">Login</h2>
          <p>Login to access your travelwise account</p>
          <input type="email" placeholder="Email" value="john.doe@gmail.com" readOnly className="input" />
          <input type="password" placeholder="Password" className="input" />
          <div className="remember-forgot">
            <label>
              <input type="checkbox" className="checkbox" /> Remember me
            </label>
            <a href="#" className="link">Forgot Password</a>
          </div>
          <button className="button">Login</button>
          <p>Don’t have an account? <a href="#" className="link">Sign up</a></p>
        </div>
        </div>
        <div className="right-side">
          <div className="image">
            <img src={loginimg}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
