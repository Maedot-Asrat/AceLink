import React from 'react';
import google from '../../assets/google.svg';
import image1 from '../../assets/image1.png';
import logo from '../../assets/Logo.png';
import './Login.css';

import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login(){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form Data:', formData);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, formData);
      const { token, user } = res.data;
  
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('role', user.role);
      localStorage.setItem('id', user.id);
  
      if (user.role === 'Student') {
        // Assuming the student ID is returned within the 'profile' of the user object
        const studentId = user.profileId; // Adjust according to your backend response
        localStorage.setItem('studentId', studentId);
      }
  
      alert('Login successful');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      alert('Error during login: ' + (error.response?.data?.error || 'Please try again.'));
    }
  };
  

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
            <p>This may take a few seconds, please hold!.</p>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input type="email" name="email" placeholder="youremail@gmail.com" onChange={handleChange} required/>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" placeholder="*********" onChange={handleChange} required />
    
              </div>

              <div className="form-group-remeber">
                <div>
                <input type="checkbox" id="rememberMe" />
                <label htmlFor="rememberMe">Remember me</label>
                </div>
                <div>
                  <a href="/forgotPass" className="forgot-password">Forgot password?</a>
                </div>
              </div>

              <button type="submit" className="login-button">Login</button>
              </form>
              <p className="or-text">--- OR ---</p>

              <button className="google-login">
                <div className='google-img'> <img src={google} alt="google" /></div>
                <p>Continue with Google</p>
              </button>
            
            
            <p> Don't have an account? <a href="/registerStudent">Signup.</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
