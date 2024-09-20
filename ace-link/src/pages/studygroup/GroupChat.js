import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    Link,
    Stack,
    Divider,
    Paper,
} from '@mui/material';
import { Upload as UploadIcon, Send as SendIcon } from '@mui/icons-material';

const GroupChat = ({ userId }) => {
    const { groupId } = useParams(); // Get groupId from the route parameters
    const [group, setGroup] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]); // State for chat messages
    const [file, setFile] = useState(null);
    const [files, setFiles] = useState([]); // State to store uploaded files
    const [previousChats, setPreviousChats] = useState([]); // State for previous chats

    useEffect(() => {
        console.log("Group ID from params:", groupId);
        if (groupId && userId) {
            // Fetch group details, chat history, and files
            const fetchGroupData = async () => {
                try {
                    // Fetch group and chat history
                    const groupResponse = await axios.get(`${process.env.REACT_APP_API_URL}/group/${groupId}`);
                    setGroup(groupResponse.data);
                    console.log(groupResponse.data);
                    setMessages(groupResponse.data.chat || []); // Load current chat messages

                    // Fetch previous chats
                    const previousChatsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/group/${groupId}/previous-chats`);
                    setPreviousChats(previousChatsResponse.data.chats || []); // Load previous chats

                    // Fetch uploaded files
                    const filesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/group/${groupId}/files`);
                    setFiles(filesResponse.data.files || []); // Load uploaded files
                } catch (error) {
                    console.error("Error fetching group details, chats, or files", error);
                }
            };
            fetchGroupData();
        }
    }, [userId, groupId]);

    const handleSendMessage = async () => {
        if (!message.trim()) return; // Prevent sending empty messages
        try {
            // POST request to send message to the group chat
            await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupId}/chat`, { userId, message });
            setMessages([...messages, { userId, message, timestamp: new Date() }]);
            setMessage(''); // Clear the input after sending the message
        } catch (error) {
            console.error("Error sending message", error);
        }
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/group/${groupId}/files`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('File uploaded successfully');

            // Fetch the updated files list after upload
            const updatedFilesResponse = await axios.get(`${process.env.REACT_APP_API_URL}/group/${groupId}/files`);
            setFiles(updatedFilesResponse.data.files || []); // Update files state
            setFile(null); // Reset the file input
        } catch (error) {
            console.error("Error uploading file", error);
            alert('Failed to upload file.');
        }
    };

    return (
        <Box sx={{ maxWidth: '800px', margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                {group ? group.title : 'Loading group...'}
            </Typography>

            {/* Previous Chats Section (Optional) */}
            {/* 
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Previous Chats
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflowY: 'auto', padding: 2 }}>
                    {previousChats.length > 0 ? (
                        <List>
                            {previousChats.map((chat, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <Box>
                                        <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
                                            {chat.userId}
                                        </Typography>
                                        <Typography variant="body1" component="p">
                                            {chat.message}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(chat.timestamp).toLocaleString()}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No previous chats found.
                        </Typography>
                    )}
                </Paper>
            </Box>
            */}

            {/* Current Chat Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Current Chat
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 300, overflowY: 'auto', padding: 2, mb: 2 }}>
                    {messages.length > 0 ? (
                        <List>
                            {messages.map((msg, index) => (
                                <ListItem key={index} alignItems="flex-start">
                                    <Box>
                                        <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
                                            {msg.userId}
                                        </Typography>
                                        <Typography variant="body1" component="p">
                                            {msg.message}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </Typography>
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No messages yet. Start the conversation!
                        </Typography>
                    )}
                </Paper>

                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                        multiline
                        maxRows={4}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        endIcon={<SendIcon />}
                        onClick={handleSendMessage}
                        sx={{ height: '56px' }}
                    >
                        Send
                    </Button>
                </Stack>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* File Upload Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Upload Files
                </Typography>
                <Box component="form" onSubmit={handleFileUpload} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadIcon />}
                    >
                        Choose File
                        <input
                            type="file"
                            hidden
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                    </Button>
                    <Typography variant="body1" sx={{ flexGrow: 1 }}>
                        {file ? file.name : 'No file selected'}
                    </Typography>
                    <Button variant="contained" color="secondary" type="submit">
                        Upload
                    </Button>
                </Box>
            </Box>

            {/* Uploaded Files Section */}
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" gutterBottom>
                    Uploaded Files
                </Typography>
                <Paper variant="outlined" sx={{ maxHeight: 200, overflowY: 'auto', padding: 2 }}>
                    {files.length > 0 ? (
                        <List>
                            {files.map((fileItem, index) => (
                                <ListItem key={index}>
                                    <Link
                                        href={`http://localhost:3000/${fileItem}`} // Adjust this based on your file's relative path
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        underline="hover"
                                    >
                                        {fileItem.name ? fileItem.name : `File ${index + 1}`}
                                    </Link>
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body2" color="text.secondary">
                            No files uploaded yet.
                        </Typography>
                    )}
                </Paper>
            </Box>
        </Box>
    );
};

export default GroupChat;
