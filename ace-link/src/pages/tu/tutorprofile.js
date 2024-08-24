import React from 'react';
import { FaStar } from 'react-icons/fa';
import picture from '../../assets/picture.png';
import './tutorprofile.css';
const TutorProfile = () => {
  return (
    <div className="dashboard-container">
      <div></div>

      <div className="main-content">
        <div className="profile-header">
          <img src={picture} alt="Mr Daniel Kebede" className="profile-image" />
          <div className="profile-info">
            <h2>Mr Daniel Kebede</h2>
            <p>BSc in Mathematics</p>
          </div>
          <div className="profile-rating">
            <div>
              <FaStar className="rating-star" />
              <span>4.6</span>
              <span className="rating-count">(38 ratings)</span>
            </div>
            <p className="experience-years">5+ years</p>
          </div>
        </div>

        <div className="bio-section">
          <h3>Bio</h3>
          <div className="section-divider"></div>
          <p>Something about them self and what they do goes here. Something about them self and what they do goes here. Something about them self and what they do goes here. Something about them self and what they do goes here.</p>
        </div>

        <div className="info-sections">
          <div className="column-section">
            <div className="info-section">
              <h4>Education level</h4>
              <div className="section-divider"></div>
              <p>Bachelor Applied Math<br />Addis Ababa University</p>
              <p>Bachelor Applied Math<br />Addis Ababa University</p>
            </div>

            <div className="info-section">
              <h4>Schedule</h4>
              <div className="section-divider"></div>
              <table className="schedule-table">
                <tbody>
                  <tr>
                    <td>Monday</td>
                    <td>9:00 AM - 5:00 PM</td>
                    <td>EST</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>9:00 AM - 5:00 PM</td>
                    <td>EST</td>
                  </tr>
                  <tr>
                    <td>Monday</td>
                    <td>9:00 AM - 5:00 PM</td>
                    <td>EST</td>
                  </tr>
                  
                </tbody>
              </table>
            </div>
          </div>

          <div className="column-section">
            <div className="info-section">
              <h4>Specialization Areas</h4>
              <div className="section-divider"></div>
              <div className="tags">
                <span className="tag">Mathematics</span>
                <span className="tag">Mathematics</span>
                <span className="tag">Mathematics</span>
                <span className="tag">Mathematics</span>
              </div>
            </div>

            <div className="info-section">
              <h4>Language Spoken</h4>
              <div className="section-divider"></div>
              <div className="tags">
                <span className="tag">English</span>
                <span className="tag">Amharic</span>
                <span className="tag">Spanish</span>
                <span className="tag">Arabic</span>
              </div>
            </div>

            <div className="info-section">
              <h4>Courses</h4>
              <div className="section-divider"></div>

          
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorProfile;
