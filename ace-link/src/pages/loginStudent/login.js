import React from 'react';
import google from '../../assets/google.svg';
import image1 from '../../assets/image1.png';
import logo from '../../assets/Logo.png';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-header">
        <div className="logo">
          <img src={logo} alt="Logo" />
          <h4>Acelink</h4>
        </div>
        <div className="signup-options">
          <a href='/registerStudent'><button className="signup-button">Sign up as a Student</button></a>
          <a href='/registerTutor'><button className="signup-button">Sign up as a Tutor</button></a>
         
        </div>
      </div>
      <div className="login-container">
        <div className="login-image">
          <img src={image1} alt="Placeholder" />
        </div>
        <div className="login-form">
          <div className="form-container">
            <img src={logo} alt="Logo" />
            <h2>Welcome, Student!</h2>
            <p>Please, log in to your account as a student.</p>
            <form>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="youremail@gmail.com" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" placeholder="*********" />
    
              </div>

              <div className="form-group-remeber">
                <div>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div>
                  <a href="/" className="forgot-password">Forgot password?</a>
                </div>
              </div>

              {/* <button type="submit" className="login-button">Login</button> */}
              
              <p className="or-text">--- OR ---</p>

              <button className="google-login">
                <div className='google-img'> <img src={google} alt="google" /></div>
                <p>Continue with Google</p>
                
              
              </button>
            </form>
            <a href='/tutors'><button className="login-button">Login</button></a>
            <p> Don't have an account? <a href="/registerStudent">Signup.</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
