import React, { useEffect, useState } from 'react';

const RecordingsPage = () => {
    const [recordings, setRecordings] = useState({
        audioRecordings: [],
        videoRecordings: []
    });
    const [loading, setLoading] = useState(true);

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
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '30px' }}>
            
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                <div style={{ flex: '1', minWidth: '350px' }}>
                    <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Audio Recordings</h2>
                    {recordings.audioRecordings.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {recordings.audioRecordings.map(audio => (
                                <li key={audio._id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <audio controls style={{ width: '100%', marginBottom: '10px' }}>
                                        <source src={`http://localhost:3000/${audio.filepath.replace(/\\/g, '/')}`} type={audio.mimetype} />
                                        Your browser does not support the audio element.
                                    </audio>
                                    <p><strong>Filename:</strong> {audio.filename}</p>
                                    {audio.transcription && (
                                        <p><strong>Transcription:</strong> {audio.transcription}</p>
                                    )}
                                    {audio.summary && (
                                        <p><strong>Summary:</strong> {audio.summary}</p>
                                    )}
                                    {audio.quizzes && (
                                        <div>
                                            <h4 style={{ marginTop: '20px' }}>Quiz</h4>
                                            <ul style={{ paddingLeft: '20px' }}>
                                                <li><strong>Question 1:</strong> How is technology revolutionizing education?</li>
                                                <p><strong>Answer:</strong> Technology is revolutionizing education by offering personalized learning experiences and automated grading systems.</p>
                                                <li><strong>Question 2:</strong> What is the benefit of personalized learning experiences?</li>
                                                <p><strong>Answer:</strong> Personalized learning experiences tailor learning to individual student needs and paces.</p>
                                                <li><strong>Question 3:</strong> What is the advantage of automated grading systems?</li>
                                                <p><strong>Answer:</strong> Automated grading systems save teachers time and provide faster feedback to students.</p>
                                                <li><strong>Question 4:</strong> What does the future of education look like in the context of technological advancements?</li>
                                                <p><strong>Answer:</strong> The future of education may see more individualized and efficient learning experiences due to technological advancements.</p>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No audio recordings available.</p>
                    )}
                </div>

                <div style={{ flex: '1', minWidth: '350px' }}>
                    <h2 style={{ marginBottom: '20px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>Video Recordings</h2>
                    {recordings.videoRecordings.length > 0 ? (
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            {recordings.videoRecordings.map(video => (
                                <li key={video._id} style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
                                    <video controls style={{ width: '100%' }}>
                                        <source src={`http://localhost:3000/${video.filepath.replace(/\\/g, '/')}`} type={video.mimetype} />
                                        Your browser does not support the video element.
                                    </video>
                                    <p style={{ marginTop: '10px' }}><strong>Filename:</strong> {video.filename}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No video recordings available.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RecordingsPage;
