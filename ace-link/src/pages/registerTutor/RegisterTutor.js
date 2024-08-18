
import logo from '../../assets/Logo.png';

import signupImg from '../../assets/signup.png';
import './RegisterTutor.css';

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:'Tutor',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('preferredTutorAttributes.')) {
      const key = name.split('.')[1];
      setFormData({
        ...formData,
        preferredTutorAttributes: {
          ...formData.preferredTutorAttributes,
          [key]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/register`, formData);
      alert('Registration successful');
      navigate('/loginTutor');
    } catch (error) {
      alert('Error during registration');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <h2 className="title">Register as a tutor</h2>
            <p>Let’s get you all set up so you can have the best experience in learning.</p>
            <div className="input-row">
              <input  type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
             className="input half-width" />
              
            </div>
            <div className="input-row">
              <input 
              type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
              className="input half-width" />
            </div>
            <input 
              type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
            className="input full-width" />
            <input 
              type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      required
            className="input full-width" />
            <div className="terms-and-register">
              <label>
                <input type="checkbox" className="checkbox" /> I agree to all the <a href="#" className="link">Terms</a> and <a href="#" className="link">Privacy Policies</a>
              </label>
              <a href="/registerStudent" className="link">Register as a student</a>
            </div>
            <button type="submit" className="button">Create account</button>
            <p>Already have an account? <a href="/loginTutor" className="link">Login</a></p>
            </form>
          </div>
         
        </div>
        
      </div>
    </div>
  );
}

export default Register;





