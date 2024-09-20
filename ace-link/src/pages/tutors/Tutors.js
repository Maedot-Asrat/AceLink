import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import TextField from '@mui/material/TextField'; // Import MUI TextField
import './tutors.css';
import '../../components/profilecard/profilecard.css';
import Picture from "../../assets/picture.png"; // You can remove this if we're using a grey circle instead of a default image

export default function Tutors() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // For debouncing

  // Fetch tutor recommendations on component mount
  useEffect(() => {
    const fetchTutorRecommendations = async () => {
      try {
        const studentId = localStorage.getItem('studentId');
        if (!studentId) {
          throw new Error('No student ID found in localStorage');
        }

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/recommend-tutor`, { studentId });
        const { tutors } = response.data;
        if (!tutors || tutors.length === 0) {
          throw new Error('No tutors found');
        }

        setProfiles(tutors);  // Set all tutors
        setFilteredProfiles(tutors);  // Initial filtered profiles
        setLoading(false);  // Disable loading state
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTutorRecommendations();  // Fetch tutor recommendations when component mounts
  }, []);

  // Debounce the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300); // 300ms delay before setting the debounced search term

    return () => {
      clearTimeout(handler); // Clear the timeout if the user types within 300ms
    };
  }, [searchTerm]);

  // Effect to handle the search API request after debouncedSearchTerm changes
  useEffect(() => {
    const searchTutors = async () => {
      if (debouncedSearchTerm === '') {
        setFilteredProfiles(profiles);  // Reset to original list if search is cleared
        return;
      }

      try {
        // Call the search API when the debounced search term changes
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/tutor/search/${debouncedSearchTerm}`);
        const { tutors } = response.data;

        // Set the search result
        setFilteredProfiles(tutors.length ? tutors : []); 
      } catch (err) {
        console.error('Error searching tutor by username:', err);
        setFilteredProfiles([]); // Clear profiles on error or no match
      }
    };

    searchTutors();
  }, [debouncedSearchTerm, profiles]);

  // Loading state
  if (loading) {
    return <div className='loading'>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div className='error'>Error: {error}</div>;
  }

  // Display profiles with search functionality
  
  return (
    <div className="tutors-container">
      {/* Search bar using MUI TextField */}
      <div className="">
        <TextField
          variant="outlined"
          label="Search tutors by username..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          fullWidth
          sx={{
            marginBottom: '20px',
            backgroundColor: '#f0f0f0',
            borderRadius: '5px',
            width: '30rem', // Set width
            maxWidth: '100%', // Ensure responsive on small screens
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#113C49', // Custom border color
              },
              '&:hover fieldset': {
                borderColor: '#4CAF50', // Border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#113C49', // Border color when focused
              },
            },
          }}
        />
      </div>

      {/* Tutor profiles */}
      <div className="tutors">
        {filteredProfiles.length === 0 ? (
          <div>No tutors found</div>
        ) : (
          filteredProfiles.map(profile => (
            <Profilecard
              key={profile._id}
              id={profile._id}
              bio={profile.profile?.qualifications || "No bio available"}
              rating={profile.average_rating || 0}
              image={profile.profile?.profile_picture} // Now handles fallback for missing picture
              name={profile.username}
              title={profile.profile?.subject_expertise?.join(', ') || "No title available"}
              cost={profile.profile?.fee?.join(', ') || "N/A"}
            />
          ))
        )}
      </div>
    </div>
  );
}

// Profilecard component

function Profilecard({ id, bio, rating, image, name, title, cost }) {
  return (
    <div className="profilecard">
      <div className="tutor-image-rate">
        {/* Always display the grey circle */}
        <div className="tutor-placeholder-circle">
          {/* Overlay the profile picture if available */}
          {image && image !== '' && (
            <img src={image} alt={name.charAt(0).toUpperCase()} className="tutor-image" />
          )}
        </div>
        <div className="tutor-rate">${cost}/hr</div>
      </div>
      <div className="tutor-info">
        <div className="tutor-name-degree">
          <h3>{name}</h3>
          <div className="tutor-rating">
            <FaStar className="rating-star" />
            <span>{rating}</span>
          </div>
        </div>
        <p>{title}</p>
        <p>{bio}</p>
        <div className="btn">
          <Link to={`/tutor/${id}`}>View profile</Link> 
        </div>
      </div>
    </div>
  );
}

