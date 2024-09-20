



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudyGroupsPage = () => {
  const [studyGroups, setStudyGroups] = useState([]);
  const [myGroups, setMyGroups] = useState([]); // State for user's groups
  const [newGroup, setNewGroup] = useState({
    title: '',
    description: '',
    subject: '',
    meetingSchedule: ''
  });
  const [joinRequestStatus, setJoinRequestStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all study groups on component mount
    fetchStudyGroups();
    fetchMyGroups(); // Fetch groups where the user is a member
  }, []);

  const fetchStudyGroups = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/group`);
      setStudyGroups(res.data);
    } catch (err) {
      console.error('Error fetching study groups:', err);
    }
  };

  const fetchMyGroups = async () => {
    try {
      const userId = localStorage.getItem('id');
 // Replace with actual user ID
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/group/member/${userId}`);
      setMyGroups(res.data); // Assuming API returns groups where the user is a member
    } catch (err) {
      console.error('Error fetching user groups:', err);
    }
  };

  const handleInputChange = (e) => {
    setNewGroup({
      ...newGroup,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_API_URL}/group`, newGroup);
      setNewGroup({ title: '', description: '', subject: '', meetingSchedule: '' });
      fetchStudyGroups(); // Refresh groups list
      setLoading(false);
    } catch (err) {
      console.error('Error creating group:', err);
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('id');

      await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupId}/request`, { userId });
      setJoinRequestStatus('Request sent successfully');
      setLoading(false);
    } catch (err) {
      console.error('Error joining group:', err);
      setJoinRequestStatus('Failed to send request');
      setLoading(false);
    }
  };

  return (
    <div className="content">
      <h1>Study Groups</h1>

      {/* Create Group Form */}
      <form onSubmit={handleCreateGroup} className="create-group-form">
        <h2>Create a Study Group</h2>
        <input
          type="text"
          name="title"
          placeholder="Group Title"
          value={newGroup.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newGroup.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newGroup.subject}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="meetingSchedule"
          placeholder="Meeting Schedule"
          value={newGroup.meetingSchedule}
          onChange={handleInputChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Group'}
        </button>
      </form>

      {/* Display Study Groups */}
      <div className="study-groups-list">
        <h2>Available Study Groups</h2>
        {studyGroups.length > 0 ? (
          studyGroups.map((group) => (
            <div key={group._id} className="study-group">
              <h3>{group.title}</h3>
              <p><strong>Description:</strong> {group.description}</p>
              <p><strong>Subject:</strong> {group.subject}</p>
              <p><strong>Meeting Schedule:</strong> {group.meetingSchedule}</p>
              <button onClick={() => handleJoinGroup(group._id)} disabled={loading}>
                {loading ? 'Joining...' : 'Join Group'}
              </button>
            </div>
          ))
        ) : (
          <p>No study groups available</p>
        )}
      </div>

      {/* Display User's Groups */}
      <div className="my-groups-list">
        <h2>My Study Groups</h2>
        {myGroups.length > 0 ? (
          myGroups.map((group) => (
            <div key={group._id} className="my-study-group">
              <h3>{group.title}</h3>
              <p><strong>Description:</strong> {group.description}</p>
              <p><strong>Subject:</strong> {group.subject}</p>
              <p><strong>Meeting Schedule:</strong> {group.meetingSchedule}</p>
            </div>
          ))
        ) : (
          <p>You are not a member of any study groups</p>
        )}
      </div>

      {joinRequestStatus && <p>{joinRequestStatus}</p>}
    </div>
  );
};

export default StudyGroupsPage;
