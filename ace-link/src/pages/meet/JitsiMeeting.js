import React, { useEffect, useRef, useState } from 'react';
import ChatbotPage from '../chatbot/chatbot'; // Import your chatbot component
import { FiMessageSquare } from 'react-icons/fi'; // Optional: Import an icon for the chatbot

const JitsiWithCustomUI = () => {
    const jitsiContainerRef = useRef(null);
    const [videoRecorder, setVideoRecorder] = useState(null);
    const [audioRecorder, setAudioRecorder] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);
    const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to toggle chatbot visibility

    useEffect(() => {
        const api = new window.JitsiMeetExternalAPI("8x8.vc", {
            roomName: "vpaas-magic-cookie-24fead3220f24e59aaa89a08e9e6d520/SampleAppMassiveCommercesSeparateDeeply",
            parentNode: jitsiContainerRef.current,
            jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMjRmZWFkMzIyMGYyNGU1OWFhYTg5YTA4ZTllNmQ1MjAvMDY2ODMwLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjUyOTY5NzEsImV4cCI6MTcyNTMwNDE3MSwibmJmIjoxNzI1Mjk2OTY2LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMjRmZWFkMzIyMGYyNGU1OWFhYTg5YTA4ZTllNmQ1MjAiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImZlbnV0aWdpc3QiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA0MTA1OTMzMTk1MDgxNjcyOTg2IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJmZW51dGlnaXN0QGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.gHG2G2hSVQbZwr6XrggjMrXN7Kz9QbFUHXwv4Z8BFtEauSY5CP0SWXIYMxcnNlaL4JPZYniRMsGVZw30lhMfkPRQZoYkNzd5XJ6Q6F0flLbM9TJagltPEzWMfIfTgNOD8Q5oVvMcEoPDCU75T7gOnbRTh78ON_uYwOhqKZ1PY4nqpGuf41P1Q3xr1pLz4VDyz73KlpaBriZflyFG0PyAStu-9l7dGhxGOQ46uXktOBu0m5gFP015AtY63Krcx6gzqewx9DqLfBgaNpCRiFJ6RSPHEtr0FYIexorFhMFXfvPx5HuS4vdK4zlAk4tzO-LGu4hv0kaWLHmpNXXN_mM7gg",
            configOverwrite: {
                toolbarButtons: [
                    'microphone', 'camera', 'closedcaptions', 'desktop', 
                    'embedmeeting', 'fullscreen', 'fodeviceselection', 'hangup', 
                    'profile', 'chat', 'recording', 'livestreaming', 'etherpad', 
                    'sharedvideo', 'settings', 'raisehand', 'videoquality', 
                    'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts', 
                    'tileview', 'download', 'help', 'mute-everyone', 'security',
                    'whiteboard'
                ]
            }
        });

        return () => api.dispose();
    }, []);

    const startRecording = async () => {
        try {
            const videoStream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: "screen" },
                audio: true
            });

            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });

            const videoRec = new MediaRecorder(videoStream);
            const audioRec = new MediaRecorder(audioStream);

            setVideoChunks([]);
            setAudioChunks([]);

            videoRec.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    setVideoChunks((prev) => [...prev, e.data]);
                }
            };

            audioRec.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    setAudioChunks((prev) => [...prev, e.data]);
                }
            };

            videoRec.onstop = handleStopVideoRecording;
            audioRec.onstop = handleStopAudioRecording;

            videoRec.start();
            audioRec.start();

            setVideoRecorder(videoRec);
            setAudioRecorder(audioRec);
            setIsRecording(true);
            alert('Recording started');
        } catch (err) {
            console.error("Error starting recording:", err);
        }
    };

    const handleStopVideoRecording = async () => {
        try {
            const videoBlob = new Blob(videoChunks, { type: 'video/webm' });
            await uploadFile(videoBlob, 'video', 'jitsi-meeting-video.webm');
        } catch (error) {
            console.error('Error handling video recording stop:', error);
        }
    };

    const handleStopAudioRecording = async () => {
        try {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            await uploadFile(audioBlob, 'audio', 'jitsi-meeting-audio.webm');
        } catch (error) {
            console.error('Error handling audio recording stop:', error);
        }
    };

    const uploadFile = async (blob, type, filename) => {
        const formData = new FormData();
        formData.append(type, blob, filename);

        try {
            const response = await fetch('http://localhost:3000/trust/upload', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert(`${type.charAt(0).toUpperCase() + type.slice(1)} saved successfully.`);
            } else {
                alert(`Failed to save the ${type}.`);
            }
        } catch (error) {
            console.error(`Error uploading ${type}:`, error);
        }
    };

    const stopRecording = () => {
        if (videoRecorder && videoRecorder.state !== 'inactive') {
            videoRecorder.stop();
        }

        if (audioRecorder && audioRecorder.state !== 'inactive') {
            audioRecorder.stop();
        }

        setIsRecording(false);
        alert('Recording stopped');
    };

    return (
        <div style={{ height: '100vh',marginLeft:'90px', position: 'relative', overflow: 'hidden' }}>
            <div id="jaas-container" ref={jitsiContainerRef} style={{ height: '100%', zIndex: 1 }}></div>

            <div id="custom-ui" style={customUiStyles}>
                <button 
                    onClick={startRecording} 
                    disabled={isRecording}
                    style={buttonStyles}
                >
                    Start Recording
                </button>
                <button 
                    onClick={stopRecording} 
                    disabled={!isRecording}
                    style={buttonStyles}
                >
                    Stop Recording
                </button>
                <button 
                    onClick={() => setIsChatbotOpen(!isChatbotOpen)} 
                    style={chatbotButtonStyles}
                >
                    <FiMessageSquare size={24} /> Chatbot
                </button>
            </div>

            {isChatbotOpen && (
                <div style={chatbotContainerStyles}>
                    <ChatbotPage />
                </div>
            )}
        </div>
    );
};

const customUiStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    zIndex: 1000,
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const buttonStyles = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
};

const chatbotButtonStyles = {
    padding: '10px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
};

const chatbotContainerStyles = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    width: '500px',
    height: '300px',
    backgroundColor: 'black',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    overflow: 'hidden',
};

export default JitsiWithCustomUI;
