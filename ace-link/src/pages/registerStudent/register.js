// import React from 'react';
import logo from '../../assets/Logo.png';

import signupImg from '../../assets/signup.png';
import './Register.css';

// function Register() {
//   return (
//     <div className="register-page">
//       <header className="register-header">
//       <div className="logo">
//           <img src={logo} alt="Logo" />
//           <h4>Acelink</h4>
//         </div>
//         <div className="auth-buttons">
//           <a href='/loginStudent'><button className="auth-button">Log in</button></a>
//           <button className="auth-button">Sign up</button>
//         </div>
//       </header>
//       <div className="register-container">
//         <div className="register-form">
//           <h1>Register as A Student</h1>
//           <p>Do you have an experience in tutoring? Come and join us</p>
//           <form>
//             <div className="form-group">
//               <input type="text" placeholder="Full Name" />
//             </div>
//             <div className="form-group">
//               <input type="email" placeholder="E-mail Address" />
//             </div>
//             <div className="form-group dual-input">
//               <input type="password" placeholder="Password" />
//               <input type="text" placeholder="Subject" />
//             </div>
//             <div className="form-group">
//               <input type="tel" placeholder="Contact phone" />
//             </div>
//             <div className="form-group">
//               <input type="text" placeholder="year of experience" />
//             </div>
//             <div className="form-group">
//               <input type="text" placeholder="Per session" />
//             </div>
//             <div className="form-group">
//               <textarea placeholder="Write a brief paragraph about your experience"></textarea>
//             </div>
//             <div className="form-group">
//               <a href='/loginStudent'><button type="submit" className="submit-button">SUBMIT</button></a>
//             </div>
//             <div className="form-group checkbox-group">
//               <input type="checkbox" id="contact" />
//               <label htmlFor="contact">I want to be contacted by Ace-link</label>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role:'Student',
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
      navigate('/loginStudent');
    } catch (error) {
      alert('Error during registration');
    }
  };

  return (
    // <div className="register-form">
    //   <form onSubmit={handleSubmit}>
    //     <h2>Register as a Student</h2>
    //     <p>Let’s get you all set up so you can have the best experience in learning.</p>

    //     <div>
    //       <input
    //         type="text"
    //         name="username"
    //         placeholder="Username"
    //         value={formData.username}
    //         onChange={handleChange}
    //         required
    //       />
    //       <input
    //         type="email"
    //         name="email"
    //         placeholder="Email"
    //         value={formData.email}
    //         onChange={handleChange}
    //         required
    //       />
    //     </div>

    //     <div>
    //       <input
    //         type="password"
    //         name="password"
    //         placeholder="Password"
    //         value={formData.password}
    //         onChange={handleChange}
    //         required
    //       />
    //       <input
    //         type="password"
    //         name="confirmPassword"
    //         placeholder="Confirm Password"
    //         required
    //       />
    //     </div>

    //     <div>
    //       <label>
    //         <input
    //           type="checkbox"
    //           name="agreeToTerms"
              
    //         />
    //         I agree to all the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policies</a>
    //       </label>
    //     </div>

    //     <button type="submit">Create account</button>
    //   </form>

    //   <p>
    //     Already have an account? <a href="/login">Login</a>
    //   </p>

    //   <p>
    //     <a href="/registerTutor">Register as a tutor</a>
    //   </p>
    // </div>


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
            <h2 className="title">Register as a student</h2>
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
              <a href="/registerTutor" className="link">Register as a tutor</a>
            </div>
            <button type="submit" className="button">Create account</button>
            <p>Already have an account? <a href="/loginStudent" className="link">Login</a></p>
            </form>
          </div>
         
        </div>
        
      </div>
    </div>
  );
}

export default Register;





