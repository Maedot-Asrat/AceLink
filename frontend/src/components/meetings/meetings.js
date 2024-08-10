import React, { useState } from 'react';
import activities from '../../assets/activities.svg';
import board from '../../assets/board.svg';
import callicon from '../../assets/call end.svg';
import cc from '../../assets/cc.svg';
import chat from '../../assets/chat.svg';
import hand from '../../assets/hand.svg';
import mic from '../../assets/microphone.svg';
import screenshare from '../../assets/screen share.svg';
import showeveryone from '../../assets/show everyone.svg';
import video from '../../assets/video.svg';



import Sidebar from '../sidebar/sidebar';
import Chat from './chat';
import './meetings.css';

const Meeting = () => {
  const [isWhiteboardVisible, setWhiteboardVisible] = useState(false);
  const [isChatVisible, setChatVisible] = useState(false);
  const [isMicMuted, setIsMicMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  const handleWhiteboardClick = () => {
    setWhiteboardVisible(!isWhiteboardVisible);
    setChatVisible(false);
  };

  const handleChatClick = () => {
    setChatVisible(!isChatVisible);
    setWhiteboardVisible(false);
  };

  const toggleMic = () => {
    setIsMicMuted(!isMicMuted);
    
  };

  const toggleVideo = () => {
    setIsVideoOff(!isVideoOff);

  };

  const endCall = () => {
    
  };

  return (
    <div className='meeting-page'>
      <div>
        <Sidebar></Sidebar>
      </div>
      <div className="meeting-container">
        <h2 className="meeting-header">Meeting</h2>
        <div className="video-container">
          <div className="local-video">
            <video id="localVideo" autoPlay muted></video>
          </div>
          <div className="remote-video">
            <video id="remoteVideo" autoPlay></video>
          </div>
        </div>
        <div className='control'>
          <div className="control-icons">
            <button onClick={toggleMic} className="control-button">
              <img src={mic} alt="Mic" className="control-icon" />
            </button>
            <button onClick={toggleVideo} className="control-button">
              <img src={video} alt="Video" className="control-icon" />
            </button>
            <button onClick={handleWhiteboardClick} className="control-button">
              <img src={board} alt="Screen Share" className="control-icon" />
            </button>
            <button  className="control-button">
              <img src={hand} alt="End Call" className="control-icon" />
            </button>
            <button className="control-button">
              <img src={cc} alt="End Call" className="control-icon" />
            </button>

            <button onClick={endCall} className="control-button">
              <img src={callicon} alt="End Call" className="" />
            </button>
            <button onClick={endCall} className="control-button">
              <img src={screenshare} alt="End Call" className="control-icon" />
            </button>
          </div>

          <div className='control-icons-2'>
            <button className="control-button-2">
              <img src={showeveryone} alt="End Call" className="control-icon" />
            </button>
            <button className="control-button-2">
              <img src={activities} alt="End Call" className="control-icon" />
            </button>
            <button onClick={handleChatClick} className="control-button-2">
              <img src={chat} alt="Chat" className="control-icon" />
            </button>
          </div>
        </div>
        {isChatVisible && (
          <div className="chat-container">
            <Chat />
          </div>
        )}
      </div>
    </div>
  );
};

export default Meeting;
