import React, { useState } from 'react';
import './profile.css';

const EditProfile = () => {
  const [subjects, setSubjects] = useState(["Math", "Physics"]);
  const [languages, setLanguages] = useState(["English", "Spanish"]);
  const [specializations, setSpecializations] = useState(["STEM"]);
  const [certifications, setCertifications] = useState(["Certified Math Tutor"]);
  const [interests, setInterests] = useState(["Reading", "Music"]);
  const [fee, setFee] = useState(50);
  const [gradeLevels, setGradeLevels] = useState(["9", "10"]);
  const [teachingStyle, setTeachingStyle] = useState("Interactive");
  const [experience, setExperience] = useState(5);
  const [timeZone, setTimeZone] = useState("UTC");

  const timeZones = [
    "UTC", "GMT", "EST", "CST", "MST", "PST", "AKST", "HST",
    "Europe/London", "Europe/Paris", "Asia/Tokyo", "Australia/Sydney"
  ];

  const [newSubject, setNewSubject] = useState('');
  const [newLanguage, setNewLanguage] = useState('');
  const [newSpecialization, setNewSpecialization] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newInterest, setNewInterest] = useState('');

  const handleAdd = (setter, currentList, newItem, setNewItem) => {
    if (newItem.trim() && !currentList.includes(newItem)) {
      setter([...currentList, newItem]);
      setNewItem('');
    }
  };

  const handleDelete = (setter, currentList, itemToRemove) => {
    setter(currentList.filter(item => item !== itemToRemove));
  };

  const handleGradeLevelChange = (event) => {
    const { value, checked } = event.target;
    setGradeLevels(prev =>
      checked ? [...prev, value] : prev.filter(level => level !== value)
    );
  };

  return (
    <div className="edit-profile-container">
      <h1 className="edit-profile-title">Edit Profile</h1>
      <form className="edit-profile-form">
        
        {/* Subject Expertise */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="subject_expertise">Subject Expertise</label>
          <div className="edit-profile-subject-tags">
            {subjects.map((subject, index) => (
              <div key={index} className="edit-profile-tag">
                <span>{subject}</span>
                <button
                  type="button"
                  className="edit-profile-delete-tag"
                  onClick={() => handleDelete(setSubjects, subjects, subject)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="subject_expertise"
              className="edit-profile-input"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd(setSubjects, subjects, newSubject, setNewSubject);
                  e.preventDefault();
                }
              }}
              placeholder="Add a subject and press Enter"
            />
          </div>
        </div>

        {/* Fee */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="fee">Fee</label>
          <input
            type="number"
            id="fee"
            className="edit-profile-input"
            value={fee}
            onChange={(e) => setFee(Number(e.target.value))}
            placeholder="Enter fee"
          />
        </div>

        {/* Grade Levels */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label">Grade Levels</label>
          <div className="edit-profile-checkbox-group">
            {["9", "10", "11", "12"].map(level => (
              <label key={level} className="edit-profile-checkbox-label">
                <input
                  type="checkbox"
                  name="grade_levels"
                  value={level}
                  checked={gradeLevels.includes(level)}
                  onChange={handleGradeLevelChange}
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        {/* Teaching Style */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="teaching_style">Teaching Style</label>
          <select
            id="teaching_style"
            className="edit-profile-select"
            value={teachingStyle}
            onChange={(e) => setTeachingStyle(e.target.value)}
          >
            <option value="Interactive">Interactive</option>
            <option value="Lecture">Lecture</option>
            <option value="Practical">Practical</option>
          </select>
        </div>

        {/* Experience */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="experience">Experience (years)</label>
          <input
            type="number"
            id="experience"
            className="edit-profile-input"
            value={experience}
            onChange={(e) => setExperience(Number(e.target.value))}
            placeholder="Enter years of experience"
          />
        </div>

        {/* Languages Spoken */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="languages_spoken">Languages Spoken</label>
          <div className="edit-profile-subject-tags">
            {languages.map((language, index) => (
              <div key={index} className="edit-profile-tag">
                <span>{language}</span>
                <button
                  type="button"
                  className="edit-profile-delete-tag"
                  onClick={() => handleDelete(setLanguages, languages, language)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="languages_spoken"
              className="edit-profile-input"
              value={newLanguage}
              onChange={(e) => setNewLanguage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd(setLanguages, languages, newLanguage, setNewLanguage);
                  e.preventDefault();
                }
              }}
              placeholder="Add a language and press Enter"
            />
          </div>
        </div>

        {/* Specialization Areas */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="specialization_areas">Specialization Areas</label>
          <div className="edit-profile-subject-tags">
            {specializations.map((specialization, index) => (
              <div key={index} className="edit-profile-tag">
                <span>{specialization}</span>
                <button
                  type="button"
                  className="edit-profile-delete-tag"
                  onClick={() => handleDelete(setSpecializations, specializations, specialization)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="specialization_areas"
              className="edit-profile-input"
              value={newSpecialization}
              onChange={(e) => setNewSpecialization(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd(setSpecializations, specializations, newSpecialization, setNewSpecialization);
                  e.preventDefault();
                }
              }}
              placeholder="Add a specialization and press Enter"
            />
          </div>
        </div>

        {/* Certifications */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="certifications">Certifications</label>
          <div className="edit-profile-subject-tags">
            {certifications.map((certification, index) => (
              <div key={index} className="edit-profile-tag">
                <span>{certification}</span>
                <button
                  type="button"
                  className="edit-profile-delete-tag"
                  onClick={() => handleDelete(setCertifications, certifications, certification)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="certifications"
              className="edit-profile-input"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd(setCertifications, certifications, newCertification, setNewCertification);
                  e.preventDefault();
                }
              }}
              placeholder="Add a certification and press Enter"
            />
          </div>
        </div>

        {/* Availability Time Zone */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="availability_time_zone">Availability Time Zone</label>
          <select
            id="availability_time_zone"
            className="edit-profile-select"
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
          >
            {timeZones.map((zone, index) => (
              <option key={index} value={zone}>{zone}</option>
            ))}
          </select>
        </div>

        {/* Tutoring Approach */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="tutoring_approach">Tutoring Approach</label>
          <textarea
            id="tutoring_approach"
            className="edit-profile-textarea"
            value={interests}
            onChange={(e) => setInterests(e.target.value)}
            placeholder="Describe your tutoring approach"
          />
        </div>

        {/* Interests */}
        <div className="edit-profile-input-group">
          <label className="edit-profile-label" htmlFor="interests">Interests</label>
          <div className="edit-profile-subject-tags">
            {interests.map((interest, index) => (
              <div key={index} className="edit-profile-tag">
                <span>{interest}</span>
                <button
                  type="button"
                  className="edit-profile-delete-tag"
                  onClick={() => handleDelete(setInterests, interests, interest)}
                >
                  &times;
                </button>
              </div>
            ))}
            <input
              type="text"
              id="interests"
              className="edit-profile-input"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAdd(setInterests, interests, newInterest, setNewInterest);
                  e.preventDefault();
                }
              }}
              placeholder="Add an interest and press Enter"
            />
          </div>
        </div>

        <button type="submit" className="edit-profile-submit-button">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
