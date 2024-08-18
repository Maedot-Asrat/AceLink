// import React, { useRef, useState, useEffect } from 'react';

// function JitsiMeeting() {
//   const containerRef = useRef(null);
//   const [output, setOutput] = useState('');
//   const [isRecording, setIsRecording] = useState(false);
//   const [code, setCode] = useState('');
//   const [language, setLanguage] = useState('python3');

//   useEffect(() => {
//     const domain = 'meet.jit.si';
//     const options = {
//       roomName: 'MyRoomName',
//       parentNode: containerRef.current,
//       interfaceConfigOverwrite: {
//         // Custom interface options can be added here
//       },
//     };
//     const api = new window.JitsiMeetExternalAPI(domain, options);

//     return () => api.dispose(); // Cleanup when the component is unmounted
//   }, []);

//   const runCode = async () => {
//     const response = await fetch('https://api.jdoodle.com/v1/execute', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         script: code,
//         language: language,
//         versionIndex: '0',
//         clientId: 'df3ff54c65da18d2c5a844d56e7f4721',
//         clientSecret: '87c389da758cd482bc52b268ef973e5e0bd4fa28174272526f72a22041164240',
//       }),
//     });

//     if (!response.ok) {
//       setOutput("Error: ${response.statusText}");
//       return;
//     }

//     const result = await response.json();
//     setOutput(result.output || 'Error: ' + result.error);
//   };

//   const startRecording = () => {
//     setIsRecording(true);
//     // Add logic for starting recording here
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     // Add logic for stopping recording here
//   };

//   return (
//     <div style={{ height: '100vh', margin: 0, padding: 0, overflow: 'hidden', position: 'relative' }}>
//       <div ref={containerRef} id="jaas-container" style={{ height: '100%', zIndex: 1 }}></div>

    


//     </div>
//   );
// }

// const buttonStyle = {
//   padding: '10px',
//   backgroundColor: '#007bff',
//   color: 'white',
//   border: 'none',
//   cursor: 'pointer',
//   borderRadius: '4px',
// };

// const textAreaStyle = {
//   width: '300px',
//   height: '200px',
//   marginBottom: '10px',
//   fontFamily: 'monospace',
//   fontSize: '14px',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
//   padding: '8px',
// };

// const selectStyle = {
//   width: '300px',
//   padding: '8px',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
//   marginBottom: '10px',
// };

// const outputStyle = {
//   width: '300px',
//   height: '100px',
//   whiteSpace: 'pre-wrap',
//   backgroundColor: '#f8f8f8',
//   borderRadius: '4px',
//   border: '1px solid #ccc',
//   padding: '8px',
//   fontFamily: 'monospace',
//   fontSize: '14px',
// };

// export default JitsiMeeting;





import React, { useEffect, useRef, useState } from 'react';

const JitsiMeeting = () => {
  const jaasContainerRef = useRef(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [output, setOutput] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://8x8.vc/vpaas-magic-cookie-24fead3220f24e59aaa89a08e9e6d520/external_api.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI("8x8.vc", {
        roomName: "vpaas-magic-cookie-24fead3220f24e59aaa89a08e9e6d520/SampleAppMassiveCommercesSeparateDeeply",
        parentNode: jaasContainerRef.current,
        jwt: "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtMjRmZWFkMzIyMGYyNGU1OWFhYTg5YTA4ZTllNmQ1MjAvMDY2ODMwLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MjQwMDgyODIsImV4cCI6MTcyNDAxNTQ4MiwibmJmIjoxNzI0MDA4Mjc3LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtMjRmZWFkMzIyMGYyNGU1OWFhYTg5YTA4ZTllNmQ1MjAiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImZlbnV0aWdpc3QiLCJpZCI6Imdvb2dsZS1vYXV0aDJ8MTA0MTA1OTMzMTk1MDgxNjcyOTg2IiwiYXZhdGFyIjoiIiwiZW1haWwiOiJmZW51dGlnaXN0QGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.DRMuh2HPi2YZO3UWVb0x-FMSYdRTtAOeJF7hBUmU5K575wApU9kCLZbs84Q48e69eV7lVCrhXL4j24UMkaPSUkmyoOpUJObeyX5sQkHQwPkzpRh3vo0vapju_2qcBHTO2WsGGMo9YbaPrTThEpEeuWtN9Jba5lARZ8r5MAnUm2Uxpgp3DyOHZacV6cwDOb2BWSuu6sf1OT93LpJEk0penYci1ZNDWtTl_JjBbcGkvDdedUAmaz0tiGWmblBgJtl0RbPGLLrkafd-vmpexfJbvsC9Qh8rrmChu2-8b24ko9tc_G_eNaWYVpxo-jxM3JyhQcGRJU8fjlvQYN2n0FScRw",
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
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" },
        audio: true,
      });

      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);

      recorder.ondataavailable = function (e) {
        if (e.data.size > 0) {
          setRecordedChunks((prev) => [...prev, e.data]);
        }
      };

      recorder.onstop = function () {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'jitsi-meeting-recording.webm';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };

      recorder.start();
      setIsRecording(true);
      alert('Recording started');
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      alert('Recording stopped');
    }
  };

  const runCode = async () => {
    const codeInput = document.getElementById('code-input').value;
    const language = document.getElementById('language-select').value;


const response = await fetch('https://api.jdoodle.com/v1/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        script: codeInput,
        language,
        versionIndex: "0",
        clientId: "df3ff54c65da18d2c5a844d56e7f4721", // Provided client ID
        clientSecret: "87c389da758cd482bc52b268ef973e5e0bd4fa28174272526f72a22041164240" // Provided client secret
      })
    });

    const result = await response.json();
    setOutput(result.output || "Error: ${result.error}");
  };

  return (
    <div style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
      <div id="jaas-container" ref={jaasContainerRef} style={{ height: '100%', zIndex: 1 }}></div>

      <div id="custom-ui" style={customUIStyle}>
        <button onClick={startRecording} disabled={isRecording} style={buttonStyle}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording} style={buttonStyle}>
          Stop Recording
        </button>

        <textarea id="code-input" placeholder="Write your code here..." style={codeInputStyle}></textarea>
        <select id="language-select">
          <option value="python3">Python 3</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          {/* Add more languages as needed */}
        </select>
        <button onClick={runCode} style={buttonStyle}>
          Run Code
        </button>
        <div id="output" style={outputStyle}>{output}</div>
      </div>
    </div>
  );
};

const customUIStyle = {
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

const buttonStyle = {
  padding: '10px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '4px',
};

const codeInputStyle = {
  width: '300px',
  height: '200px',
  marginBottom: '10px',
  fontFamily: 'monospace',
  fontSize: '14px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  padding: '8px',
};

const outputStyle = {
  whiteSpace: 'pre-wrap',
  backgroundColor: '#f5f5f5',
  padding: '10px',
  marginTop: '10px',
  border: '1px solid #ccc',
  width: '300px',
  height: '100px',
  overflow: 'auto',
  borderRadius: '4px',
};

export default JitsiMeeting;