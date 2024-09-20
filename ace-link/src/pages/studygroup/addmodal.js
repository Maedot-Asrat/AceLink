import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Modal,
  CircularProgress,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';

// Styled components for better readability
const GroupsContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
}));

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`group-tabpanel-${index}`}
      aria-labelledby={`group-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index) => {
  return {
    id: `group-tab-${index}`,
    'aria-controls': `group-tabpanel-${index}`,
  };
};

const StudyGroupsPage = () => {
  const fileInput = useRef(null);
  const navigate = useNavigate();

  const [tabIndex, setTabIndex] = useState(0);
  const [studyGroups, setStudyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [myGroups, setMyGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [groupRequests, setGroupRequests] = useState([]);
  const [newGroup, setNewGroup] = useState({
    title: '',
    description: '',
    subject: '',
    meetingSchedule: '',
    groupImage: null,
  });
  const [joinRequestStatus, setJoinRequestStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    fetchStudyGroups();
    fetchMyGroups();
    fetchJoinedGroups();
    fetchGroupRequests();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleFileInputChange = (e) => {
    setNewGroup({
      ...newGroup,
      groupImage: e.target.files[0],
    });
  };

  const handleInputChange = (e) => {
    setNewGroup({
      ...newGroup,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userId = localStorage.getItem('id');
      const formData = new FormData();

      formData.append('title', newGroup.title);
      formData.append('description', newGroup.description);
      formData.append('subject', newGroup.subject);
      formData.append('meetingSchedule', newGroup.meetingSchedule);
      formData.append('owner', userId);

      if (newGroup.groupImage) {
        formData.append('groupImage', newGroup.groupImage);
      }

      const res = await axios.post(`${process.env.REACT_APP_API_URL}/group`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Group created:', res.data);

      // Reset form
      setNewGroup({
        title: '',
        description: '',
        subject: '',
        meetingSchedule: '',
        groupImage: null,
      });

      // Optionally, refresh the group lists
      fetchStudyGroups();
      fetchMyGroups();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinGroup = async (groupId) => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('id');
      console.log(`Joining group with ID: ${groupId}, user ID: ${userId}`);
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupId}/request`, { userId });
      console.log('Join group response:', res.data);
      setJoinRequestStatus('Request sent successfully');
    } catch (err) {
      console.error('Error joining group:', err.response ? err.response.data : err.message);
      setJoinRequestStatus('Failed to send request');
    } finally {
      setLoading(false);
      // Optionally, refresh the study groups
      fetchStudyGroups();
    }
  };

  const handleAcceptRequest = async (groupId, userId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupId}/accept`, { userId });
      fetchGroupRequests();
    } catch (err) {
      console.error('Error accepting request:', err);
    }
  };

  const handleRejectRequest = async (groupId, userId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupId}/reject`, { userId });
      fetchGroupRequests();
    } catch (err) {
      console.error('Error rejecting request:', err);
    }
  };

  const handleOpenGroupChat = (groupId) => {
    navigate(`/group-chat/${groupId}`);
  };

  const handleOpenGroup = (group) => {
    setSelectedGroup(group);
  };

  const handleCloseModal = () => {
    setSelectedGroup(null);
  };

  // Data fetching functions
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
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/group/owner/${userId}`);
      setMyGroups(res.data);
    } catch (err) {
      console.error('Error fetching user groups:', err);
    }
  };

  const fetchJoinedGroups = async () => {
    try {
      const userId = localStorage.getItem('id');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/group/member/${userId}`);
      setJoinedGroups(res.data);
    } catch (err) {
      console.error('Error fetching joined groups:', err);
    }
  };

  const fetchGroupRequests = async () => {
    try {
      const userId = localStorage.getItem('id');
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/group/requests/${userId}`);
      setGroupRequests(res.data);
    } catch (err) {
      console.error('Error fetching group requests:', err);
    }
  };

  return (
    <GroupsContainer>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="group tabs" variant="scrollable" scrollButtons="auto">
          <Tab label="All Groups" {...a11yProps(0)} />
          <Tab label="Joined Groups" {...a11yProps(1)} />
          <Tab label="My Groups" {...a11yProps(2)} />
          <Tab label="Create Group" {...a11yProps(3)} />
          <Tab label="Requests" {...a11yProps(4)} />
        </Tabs>
      </Box>

      {/* All Groups Tab */}
      <TabPanel value={tabIndex} index={0}>
       
        <Grid container spacing={2}>
          {studyGroups.length > 0 ? (
            studyGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {group.groupImage && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.REACT_APP_API_URL}/uploads/${group.groupImage}`}
                      alt={`${group.title} Group`}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {group.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Description:</strong> {group.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Subject:</strong> {group.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Meeting Schedule:</strong> {group.meetingSchedule}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={() => handleJoinGroup(group._id)}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Join Group'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No study groups available</Typography>
          )}
        </Grid>
      </TabPanel>

      {/* Joined Groups Tab */}
      <TabPanel value={tabIndex} index={1}>
       
        <Grid container spacing={2}>
          {joinedGroups.length > 0 ? (
            joinedGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}
                  onClick={() => handleOpenGroup(group)}
                >
                  {group.groupImage && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.REACT_APP_API_URL}/${group.groupImage}`}
                      alt={`${group.title} Group`}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {group.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Description:</strong> {group.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Subject:</strong> {group.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Meeting Schedule:</strong> {group.meetingSchedule}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2 }}>
                    <Button variant="outlined" fullWidth onClick={() => handleOpenGroupChat(group._id)}>
                      Open Group Chat
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>You have not joined any groups yet</Typography>
          )}
        </Grid>
      </TabPanel>

      {/* My Groups Tab */}
      <TabPanel value={tabIndex} index={2}>
       
        <Grid container spacing={2}>
          {myGroups.length > 0 ? (
            myGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} key={group._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  {group.groupImage && (
                    <CardMedia
                      component="img"
                      height="140"
                      image={`${process.env.REACT_APP_API_URL}/uploads/${group.groupImage}`}
                      alt={`${group.title} Group`}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="div">
                      {group.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Description:</strong> {group.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Subject:</strong> {group.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Meeting Schedule:</strong> {group.meetingSchedule}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>You have not created any groups</Typography>
          )}
        </Grid>
      </TabPanel>

      {/* Create Group Tab */}
      <TabPanel value={tabIndex} index={3}>
        <Typography variant="h5" gutterBottom>
          Create a Study Group
        </Typography>
        <Box component="form" onSubmit={handleCreateGroup} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Group Title"
                name="title"
                value={newGroup.title}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                name="description"
                value={newGroup.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Subject"
                name="subject"
                value={newGroup.subject}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Meeting Schedule"
                name="meetingSchedule"
                value={newGroup.meetingSchedule}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" component="label">
                Upload Group Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileInputChange}
                  ref={fileInput}
                />
              </Button>
              {newGroup.groupImage && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  Selected File: {newGroup.groupImage.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : 'Create Group'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>

      {/* Requests Tab */}
      <TabPanel value={tabIndex} index={4}>
        
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {groupRequests.length > 0 ? (
            groupRequests.map((requestGroup) => (
              <Grid item xs={12} key={requestGroup.groupId}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{requestGroup.title}</Typography>
                    <Typography variant="subtitle1" sx={{ mt: 1 }}>
                      Pending Requests:
                    </Typography>
                    {requestGroup.pendingRequests.length > 0 ? (
                      requestGroup.pendingRequests.map((request, index) => (
                        <Box
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            mt: 1,
                            p: 1,
                            border: '1px solid #ccc',
                            borderRadius: 1,
                          }}
                        >
                          <Typography>User ID: {request}</Typography>
                          <Box>
                            <Button
                              variant="contained"
                              color="success"
                              size="small"
                              sx={{ mr: 1 }}
                              onClick={() => handleAcceptRequest(requestGroup.groupId, request)}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              size="small"
                              onClick={() => handleRejectRequest(requestGroup.groupId, request)}
                            >
                              Reject
                            </Button>
                          </Box>
                        </Box>
                      ))
                    ) : (
                      <Typography>No pending requests</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography>No join requests for your groups</Typography>
          )}
        </Grid>
      </TabPanel>

      {/* Group Details Modal */}
      <Modal open={Boolean(selectedGroup)} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '90%', sm: 400 },
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          {selectedGroup && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                {selectedGroup.title}
              </Typography>
              {selectedGroup.groupImage && (
                <Box sx={{ mb: 2 }}>
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${selectedGroup.groupImage}`}
                    alt={`${selectedGroup.title} Group`}
                    style={{ width: '100%', borderRadius: '8px' }}
                  />
                </Box>
              )}
              <Typography variant="body1" gutterBottom>
                <strong>Description:</strong> {selectedGroup.description}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Subject:</strong> {selectedGroup.subject}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Meeting Schedule:</strong> {selectedGroup.meetingSchedule}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Resources:</strong> {selectedGroup.resources.join(', ') || 'None'}
              </Typography>
              <Box sx={{ textAlign: 'right', mt: 2 }}>
                <Button variant="contained" onClick={handleCloseModal}>
                  Close
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </GroupsContainer>
  );
};

export default StudyGroupsPage;
