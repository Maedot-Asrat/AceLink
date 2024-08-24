import React, { useEffect, useRef, useState } from 'react';

const JitsiWithCustomUI = () => {
    const jitsiContainerRef = useRef(null);
    const [videoRecorder, setVideoRecorder] = useState(null);
    const [audioRecorder, setAudioRecorder] = useState(null);
    const [videoChunks, setVideoChunks] = useState([]);
    const [audioChunks, setAudioChunks] = useState([]);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        const api = new window.JitsiMeetExternalAPI("8x8.vc", {
            roomName: "vpaas-magic-cookie-24fead3220f24e59aaa89a08e9e6d520/SampleAppMassiveCommercesSeparateDeeply",
            parentNode: jitsiContainerRef.current,
            jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMjRmZWFkMzIyMGYyNGU1OWFhYTg5YTA4ZTllNmQ1MjAvMDY2ODMwLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjQ0MDg0NDUsImV4cCI6MTcyNDQxNTY0NSwibmJmIjoxNzI0NDA4NDQwLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMjRmZWFkMzIyMGYyNGU1OWFhYTg5YTA4ZTllNmQ1MjAiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImZlbnV0aWdpc3QiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA0MTA1OTMzMTk1MDgxNjcyOTg2IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJmZW51dGlnaXN0QGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.ZMDtLqKy-HztUeMm8d5HJ10Pc6Wh9GzzfAdeobKC2gXuDHTJA99_IbNLgH0t50bb_tHBjfg1YT48vZuL1wY5TNmLEZHhoscXCPEUKnNRDX-v3Z36QRcgOpEVNmhdsh52gXei9zihOov-pqZGRsxn104w87g391bMeHiYrvChA9cOm89qynqCjShUIL6ZiSMggRwr-zfe9DQM81wZovAU8y_LhG36Fcy5s6a-DrKhSBa9n1kipeKAbP1xA_Ug_nwAg6XUSx0rgcTLKi6CG7m4R_7rUMlmwPaDGs_n27WYtUOSazLUDaNQ3CKAmlSUVkc38eAc7G9_O1pBvDx2rJB6FQ", // Replace with your actual JWT token
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
                audio: true // Enable audio in the video stream
            });

            const audioStream = await navigator.mediaDevices.getUserMedia({
                audio: true // Capture audio separately
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
        <div style={{ height: '100vh', margin:'30px', position: 'relative', overflow: 'hidden' }}>
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
            </div>
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

export default JitsiWithCustomUI;
