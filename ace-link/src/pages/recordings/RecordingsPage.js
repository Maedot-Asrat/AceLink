import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography, Box, IconButton, CardMedia } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// Ensure your CSS file is up to date with the changes

const RecordingsPage = () => {
    const [recordings, setRecordings] = useState({
        audioRecordings: [],
        videoRecordings: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Audio Recordings');

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/trust/recordings`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setRecordings({
                    audioRecordings: data.audioRecordings || [],
                    videoRecordings: data.videoRecordings || []
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recordings:', error);
                setLoading(false);
            }
        };

        fetchRecordings();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="recordings-container">
            <div className="tabs">
                {['Audio Recordings', 'Video Recordings', 'Summary', 'Flashcards'].map((tab) => (
                    <Button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        variant={activeTab === tab ? 'contained' : 'outlined'}
                        sx={{ mx: 1, mb: 2 }}
                    >
                        {tab}
                    </Button>
                ))}
            </div>

            {/* Audio Recordings Section */}
            {activeTab === 'Audio Recordings' && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
                    {recordings.audioRecordings.length > 0 ? (
                        recordings.audioRecordings.map((audio) => (
                            <Card
                                key={audio._id}
                                sx={{
                                    width: '300px',
                                    borderRadius: '15px',
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                    },
                                }}
                            >
                                <CardContent>
                                    {/* <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}
                                    >
                                        {audio.title || 'Untitled Recording'}
                                    </Typography> */}

                                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <IconButton
                                            color="primary"
                                            sx={{ p: 1 }}
                                        >
                                            <PlayArrowIcon sx={{ fontSize: '40px' }} />
                                        </IconButton>

                                        <audio controls className="media-player">
                                            <source
                                                src={`${process.env.REACT_APP_API_URL}/${audio.filepath.replace(/\\/g, '/')}`}
                                                type={audio.mimetype}
                                            />
                                            Your browser does not support the audio element.
                                        </audio>
                                    </Box>

                                    {audio.transcription && (
                                        <Typography
                                            sx={{
                                                mt: 2,
                                                fontSize: '0.9rem',
                                                color: '#555',
                                                textAlign: 'left',
                                                whiteSpace: 'pre-wrap',
                                            }}
                                        >
                                            <strong>Transcription:</strong> {audio.transcription}
                                        </Typography>
                                    )}
                                </CardContent>

                                {/* <CardActions sx={{ justifyContent: 'center' }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ mt: 1, borderRadius: '30px', px: 3 }}
                                    >
                                        Download
                                    </Button>
                                </CardActions> */}
                            </Card>
                        ))
                    ) : (
                        <Typography>No audio recordings available.</Typography>
                    )}
                </Box>
            )}

            {/* Video Recordings Section */}
            {activeTab === 'Video Recordings' && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
                    {recordings.videoRecordings.length > 0 ? (
                        recordings.videoRecordings.map((video) => (
                            <Card
                                key={video._id}
                                sx={{
                                    width: '340px',
                                    borderRadius: '15px',
                                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                                    transition: 'transform 0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-10px)',
                                        boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
                                    },
                                }}
                            >
                                <CardMedia
                                    component="video"
                                    controls
                                    sx={{
                                        height: '200px',
                                        borderRadius: '15px 15px 0 0',
                                    }}
                                    src={`${process.env.REACT_APP_API_URL}/${video.filepath.replace(/\\/g, '/')}`}
                                    // title={video.title || 'Untitled Video'}
                                />
                                <CardContent sx={{ p: 2 }}>
                                    {/* <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1 }}
                                    >
                                        {video.title || 'Untitled Video'}
                                    </Typography> */}

                                    {/* <Typography
                                        sx={{
                                            mt: 2,
                                            fontSize: '0.9rem',
                                            color: '#555',
                                            textAlign: 'center',
                                            whiteSpace: 'pre-wrap',
                                        }}
                                    >
                                        {video.description || 'No description available.'}
                                    </Typography> */}
                                </CardContent>

                                {/* <Box sx={{ textAlign: 'center', mb: 2 }}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{
                                            borderRadius: '30px',
                                            px: 3,
                                        }}
                                    >
                                        Download
                                    </Button>
                                </Box> */}
                            </Card>
                        ))
                    ) : (
                        <Typography>No video recordings available.</Typography>
                    )}
                </Box>
            )}

            {/* Summary Section */}
            {activeTab === 'Summary' && (
                <Box
                    className="recording-section"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: '800px',
                        mx: 'auto',
                        mb: 4
                    }}
                >
                    {recordings.audioRecordings.length > 0 ? (
                        <Box sx={{ width: '100%' }}>
                            {recordings.audioRecordings.map((audio) => (
                                <Card
                                    key={audio._id}
                                    sx={{
                                        my: 2,
                                        p: 2,
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                        backgroundColor: '#f9f9f9',
                                        transition: 'transform 0.3s ease',
                                        '&:hover': {
                                            transform: 'scale(1.02)',
                                        },
                                    }}
                                >
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 'bold', color: '#333', mb: 1 }}
                                        >
                                            {audio.title || 'Untitled Recording'}
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontSize: '1rem',
                                                color: '#555',
                                                whiteSpace: 'pre-line',
                                                mb: 2,
                                            }}
                                        >
                                            {audio.summary || 'No summary available for this recording.'}
                                        </Typography>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                sx={{
                                                    borderRadius: '30px',
                                                    px: 3,
                                                    textTransform: 'none',
                                                }}
                                            >
                                                View Full Summary
                                            </Button>
                                            {/* <Button
                                                variant="outlined"
                                                color="secondary"
                                                sx={{
                                                    borderRadius: '30px',
                                                    px: 3,
                                                    textTransform: 'none',
                                                }}
                                            >
                                                Download
                                            </Button> */}
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    ) : (
                        <Typography sx={{ mt: 2, color: '#999' }}>
                            No summaries available.
                        </Typography>
                    )}
                </Box>
            )}

            {/* Flashcards Section */}
            {activeTab === 'Flashcards' && (
                <Box className="flashcard-section" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
                    {recordings.audioRecordings.length > 0 ? (
                        recordings.audioRecordings.map((audio) => (
                            <FlashcardItem key={audio._id} flashcards={audio.flashcards} />
                        ))
                    ) : (
                        <Typography>No flashcards available.</Typography>
                    )}
                </Box>
            )}
        </div>
    );
};

// Flashcards Section
const FlashcardItem = ({ flashcards }) => {
    const [flippedIndex, setFlippedIndex] = useState(null);

    const handleCardClick = (index) => {
        setFlippedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <>
            {flashcards.split('Card').slice(1).map((card, index) => {
                const [question, answer] = card
                    .split('Answer:')
                    .map(str => str.replace(/\*\*/g, '').trim());

                const isFlipped = flippedIndex === index;

                return (
                    <Box
                        key={index}
                        sx={{
                            perspective: '1000px',
                            my: 2,
                            cursor: 'pointer',
                        }}
                        onClick={() => handleCardClick(index)}
                    >
                        <Box
                            sx={{
                                width: '300px',
                                height: '200px',
                                position: 'relative',
                                transformStyle: 'preserve-3d',
                                transition: 'transform 0.6s',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                            }}
                        >
                            {/* Front Side (Question) */}
                            <Card
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    backgroundColor: '#f9f9f9',
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#e0e0e0',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Question
                                    </Typography>
                                    <Typography>{question.split('Question:')[1].trim()}</Typography>
                                </CardContent>
                            </Card>

                            {/* Back Side (Answer) */}
                            <Card
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backfaceVisibility: 'hidden',
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                    backgroundColor: '#f1f1f1',
                                    transform: 'rotateY(180deg)',
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Answer
                                    </Typography>
                                    <Typography>{answer}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </Box>
                );
            })}
        </>
    );
};

export default RecordingsPage;
