import React, { useRef, useState, useEffect } from 'react';

function JitsiMeeting() {
  const containerRef = useRef(null);
  const [output, setOutput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python3');

  useEffect(() => {
    const domain = 'meet.jit.si';
    const options = {
      roomName: 'MyRoomName',
      parentNode: containerRef.current,
      interfaceConfigOverwrite: {
        // Custom interface options can be added here
      },
    };
    const api = new window.JitsiMeetExternalAPI(domain, options);

    return () => api.dispose(); // Cleanup when the component is unmounted
  }, []);

  const runCode = async () => {
    const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: code,
        language: language,
        versionIndex: '0',
        clientId: 'df3ff54c65da18d2c5a844d56e7f4721',
        clientSecret: '87c389da758cd482bc52b268ef973e5e0bd4fa28174272526f72a22041164240',
      }),
    });

    if (!response.ok) {
      setOutput("Error: ${response.statusText}");
      return;
    }

    const result = await response.json();
    setOutput(result.output || 'Error: ' + result.error);
  };

  const startRecording = () => {
    setIsRecording(true);
    // Add logic for starting recording here
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Add logic for stopping recording here
  };

  return (
    <div style={{ height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}>
      <div ref={containerRef} id="jaas-container" style={{ height: '100%', zIndex: 1 }}></div>

    


    </div>
  );
}

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
};

const textAreaStyle = {
  width: '300px',
  height: '200px',
  marginBottom: '10px',
  fontFamily: 'monospace',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  padding: '8px',
};

const selectStyle = {
  width: '300px',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginBottom: '10px',
};

const outputStyle = {
  width: '300px',
  height: '100px',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#f8f8f8',
  borderRadius: '4px',
  border: '1px solid #ccc',
  padding: '8px',
  fontFamily: 'monospace',
  fontSize: '14px',
};

export default JitsiMeeting;