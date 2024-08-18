import React from 'react';
import { FaStar } from 'react-icons/fa';
import './tutors.css';

const TutorRecommendations = () => {
  const tutors = [
    {
      name: "Mr Daniel Kebede",
      degree: "BSc in Mathematics",
      rating: 4.6,
      rate: "$5/hour",
      description: "Something about themself and what they do goes here. Something about themself and what they do goes here.",
      imageUrl: "path/to/image.jpg"
    },
    {
      name: "Mr Daniel Kebede",
      degree: "BSc in Mathematics",
      rating: 4.6,
      rate: "$5/hour",
      description: "Something about themself and what they do goes here. Something about themself and what they do goes here.",
      imageUrl: "path/to/image.jpg"
    }
  ];

  return (
    <div className="dashboard-container">
      <div></div>

      <div className="main-content">
   
        <div className="tutor-cards">
          {tutors.map((tutor, index) => (
            <div className="tutor-card" key={index}>
              <div className="tutor-image-rate">
                <img src={tutor.imageUrl} alt={tutor.name} className="tutor-image" />
                <div className="tutor-rate">{tutor.rate}</div>
              </div>
              <div className="tutor-info">
                <div className="tutor-name-degree">
                  <h3>{tutor.name}</h3>
                  <div className="tutor-rating">
                    <FaStar className="rating-star" />
                    <span>{tutor.rating}</span>
                  </div>
                </div>
                <p>{tutor.degree}</p>
                <p>{tutor.description}</p>
                
                <button className="view-profile-button">View Profile</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TutorRecommendations;
