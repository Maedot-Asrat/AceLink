import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState(null);
  const [gradeLevel, setGradeLevel] = useState('');
  const [age, setAge] = useState('');
  const [goals, setGoals] = useState('');
  const [learningStyle, setLearningStyle] = useState('');
  const [subjectInterests, setSubjectInterests] = useState([]);
  const [availability, setAvailability] = useState('');
  const [preferredLanguage, setPreferredLanguage] = useState('');
  const [currentNeeds, setCurrentNeeds] = useState('');
  const [parentContactName, setParentContactName] = useState('');
  const [parentContactEmail, setParentContactEmail] = useState('');
  const [parentContactPhone, setParentContactPhone] = useState('');
  const [studyHabits, setStudyHabits] = useState('');
  const [extracurricularActivities, setExtracurricularActivities] = useState('');
  const [healthConsiderations, setHealthConsiderations] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const userId = localStorage.getItem('userId');

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubjectInterestsChange = (e) => {
    const options = Array.from(e.target.selectedOptions).map(option => option.value);
    setSubjectInterests(options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('profilePicture', profilePicture);
    formData.append('profile[gradeLevel]', gradeLevel);
    formData.append('profile[age]', age);
    formData.append('profile[goals]', goals);
    formData.append('profile[learningStyle]', learningStyle);
    formData.append('profile[subjectInterests]', subjectInterests);
    formData.append('profile[availability]', availability);
    formData.append('profile[preferredLanguage]', preferredLanguage);
    formData.append('profile[currentNeeds]', currentNeeds);
    formData.append('profile[parentContact][name]', parentContactName);
    formData.append('profile[parentContact][email]', parentContactEmail);
    formData.append('profile[parentContact][phone]', parentContactPhone);
    formData.append('profile[studyHabits]', studyHabits);
    formData.append('profile[extracurricularActivities]', extracurricularActivities);
    formData.append('profile[healthConsiderations]', healthConsiderations);
    formData.append('profile[genderPreference]', genderPreference);

    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/update-profile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      alert("Profile updated successfully");
      navigate(`/loginStudent`);
    } catch (error) {
      // Error handling code remains the same
      // ...
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h2>Polishing your profile</h2>
      <p>Let’s get you all set up so you can have the best experience in learning.</p>
      <form onSubmit={handleSubmit}>
        {/* Profile Picture */}
        <div style={{ margin: '20px 0' }}>
          <label htmlFor="profilePicture">
            <div
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '2px dashed #ccc',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                margin: '0 auto'
              }}
            >
              {profilePicture ? (
                <img
                  src={URL.createObjectURL(profilePicture)}
                  alt="Profile Preview"
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                />
              ) : (
                <span style={{ fontSize: '30px', color: '#ccc' }}>+</span>
              )}
            </div>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              style={{ display: 'none' }}
            />
          </label>
          <p>Upload your profile picture</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
          {/* Column 1 */}
          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Current Grade Level
              <select
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              >
                <option value="" disabled>Select your grade level</option>
                <option value="Bachelor">Bachelor</option>
                <option value="Master">Master</option>
                <option value="PhD">PhD</option>
              </select>
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Your Age
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                min="1"
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Goals
              <input
                type="text"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Learning Style
              <input
                type="text"
                value={learningStyle}
                onChange={(e) => setLearningStyle(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Subject Interests
              <select
                multiple
                value={subjectInterests}
                onChange={handleSubjectInterestsChange}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              >
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
                <option value="Literature">Literature</option>
                <option value="Technology">Technology</option>
              </select>
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Availability
              <input
                type="text"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Preferred Language
              <input
                type="text"
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Current Needs
              <input
                type="text"
                value={currentNeeds}
                onChange={(e) => setCurrentNeeds(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Parent's Name
              <input
                type="text"
                value={parentContactName}
                onChange={(e) => setParentContactName(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Parent's Email
              <input
                type="email"
                value={parentContactEmail}
                onChange={(e) => setParentContactEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Parent's Phone
              <input
                type="text"
                value={parentContactPhone}
                onChange={(e) => setParentContactPhone(e.target.value)}
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Study Habits
              <input
                type="text"
                value={studyHabits}
                onChange={(e) => setStudyHabits(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Extracurricular Activities
              <input
                type="text"
                value={extracurricularActivities}
                onChange={(e) => setExtracurricularActivities(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Health Considerations
              <input
                type="text"
                value={healthConsiderations}
                onChange={(e) => setHealthConsiderations(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              />
            </label>
          </div>

          <div style={{ flex: '1 1 48%', marginBottom: '20px' }}>
            <label>
              Gender Preference
              <select
                value={genderPreference}
                onChange={(e) => setGenderPreference(e.target.value)}
                required
                style={{ width: '100%', padding: '10px', marginTop: '10px' }}
              >
                <option value="No preference">No preference</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
          </div>
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#001F54', color: 'white', border: 'none', cursor: 'pointer', marginTop: '20px' }}>
          Continue
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
