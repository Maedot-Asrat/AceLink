import React, { useState } from 'react';
import logo from '../../assets/Logo.png';
import polishImg from '../../assets/signup.png';
import './profile.css';

const ProfilePolish = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className="container">
      <div className="logo">
        <img src={logo} alt="Logo" />
        <h2>Acelink</h2>
      </div>
      <div className="profile-polish-box">
        <div className="right-side">
          <div className="image">
            <img src={polishImg} alt="Polish Profile" />
          </div>
        </div>
        <div className="left-side">
          <div className="profile-polish-form">
            <h2 className="title">Polishing your profile</h2>
            <p>Let’s get you all set up so you can have the best experience in learning.</p>
            <div className="upload-section">
              <div className="upload-box" onClick={handleUploadClick}>
                {image ? <img src={image} alt="Uploaded" className="uploaded-image" /> : <span>+</span>}
              </div>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleImageChange}
              />
            </div>
            <button className="button">Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePolish;
