import React from 'react';
import manavatar from '../../assets/Man Avatar.png';
import Sidebar from '../sidebar/sidebar'; // Assuming you have a sidebar component
import './Tutors.css'; // Import a CSS file for styling

const TutorRecommendations = () => {
    const tutors = [
        { id: 1, name: 'Mr Daniel Kebede', degree: 'BSc in Mathematics', price: '$5 per session', imageUrl: 'path_to_image' },
        { id: 2, name: 'Mr Daniel Kebede', degree: 'BSc in Mathematics', price: '$5 per session', imageUrl: 'path_to_image' },
        { id: 3, name: 'Mr Daniel Kebede', degree: 'BSc in Mathematics', price: '$5 per session', imageUrl: 'path_to_image' },
        { id: 4, name: 'Mr Daniel Kebede', degree: 'BSc in Mathematics', price: '$5 per session', imageUrl: 'path_to_image' },
        { id: 5, name: 'Mr Daniel Kebede', degree: 'BSc in Mathematics', price: '$5 per session', imageUrl: 'path_to_image' },
        { id: 6, name: 'Mr Daniel Kebede', degree: 'BSc in Mathematics', price: '$5 per session', imageUrl: 'path_to_image' },
    ];

    return (
        <div className="tutor-recommendations-container">
            <Sidebar />
            <div className="content">
                <header>
                    <h2>Tutor Recommendations For You</h2>
                </header>
                <div className="tutor-cards">
                    {tutors.map((tutor) => (
                        <div className="tutor-card" key={tutor.id}>
                            <img src={manavatar} alt={tutor.name} className="tutor-image" />
                            <div className="tutor-details">
                                <h3>{tutor.name}</h3>
                                <p>{tutor.degree}</p>
                                <p className='price'>{tutor.price}</p>
                                <button className="book-session-btn">Book A Session</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TutorRecommendations;
