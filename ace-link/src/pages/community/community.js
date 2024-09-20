import React, { useEffect, useState } from 'react';
import avatar from '../../assets/Avatar.png';
import bookmarkicon from '../../assets/bookmark.png';
import './Community.css';
import io from 'socket.io-client';

const socket = io(`${process.env.REACT_APP_API_URL}`); // Ensure this points to your backend

const Community = () => {
  const [message, setMessage] = useState(''); // For posting new questions
  const [hashtags, setHashtags] = useState(''); // For hashtags
  const [chat, setChat] = useState([]); // List of messages and replies
  const [replyMessage, setReplyMessage] = useState({}); // For reply inputs per message
  const [visibleMessages, setVisibleMessages] = useState(3); // Limit visible messages to 3 initially

  // Fetch all messages from the server when the component loads
  useEffect(() => {
    socket.emit('getMessages');
  }, []);

  useEffect(() => {
    // Handle receiving new messages and replies
    socket.on('loadMessages', (messages) => {
      setChat(messages);
    });

    socket.on('newMessage', (msg) => {
      setChat((prevChat) => [...prevChat, msg]);
    });

    socket.on('newReply', (reply) => {
      setChat((prevChat) =>
        prevChat.map((msg) =>
          msg._id === reply.parentMessageId ? { ...msg, replies: [...msg.replies, reply] } : msg
        )
      );
    });

    return () => {
      socket.off('loadMessages');
      socket.off('newMessage');
      socket.off('newReply');
    };
  }, []);

  // Send a new message (question)
  const sendMessage = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')); // Assuming user object is saved
    const sender = user ? user.username : 'Anonymous'; // Get username or default to 'Anonymous'

    if (message.trim()) {
      socket.emit('chatMessage', {
        content: message,
        hashtags: hashtags.split(',').map((tag) => tag.trim()), // Split hashtags
        sender,
      });
      setMessage(''); // Clear inputs after sending
      setHashtags('');
    }
  };

  // Send a reply to a specific message
  const sendReply = (e, messageId) => {
    e.preventDefault();
    const sender = localStorage.getItem('id'); // Fetch sender

    if (replyMessage[messageId]?.trim()) {
      socket.emit('chatReply', {
        content: replyMessage[messageId],
        sender,
        parentMessageId: messageId,
      });
      setReplyMessage({ ...replyMessage, [messageId]: '' }); // Clear reply input
    }
  };

  // Handle view more messages
  const handleViewMore = () => {
    setVisibleMessages((prev) => prev + 3); // Increase visible messages by 3
  };

  return (
    <div className="community-page">
      <div className="community-content">
        <h3>Top Questions</h3>
        {chat.slice(0, visibleMessages).map((msg, index) => (
          <div key={index} className="question-card">
            <div className="b">
              <div>
                <img src={bookmarkicon} alt="bookmarkicon" className="bookmarkicon" />
              </div>
              <div>
                <div className="a">
                  <div className="question-header">
                    <h4>{msg.content}</h4>
                    <p className="question-description">{msg.content}</p>
                  </div>
                </div>
                <div className="question-tags">
                  <p key={index}>
                    <small>Hashtags: {msg.hashtags?.join(', ')}</small>
                  </p>
                  <div className="user-info">
                    <img src={avatar} alt="User" className="user-icon" />
                    <span className="user-name">{msg.sender}</span>
                    <span className="time">{new Date(msg.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="replies-section">
                    <p>{msg.replies.length} replies</p>
                    {msg.replies.map((reply, i) => (
                      <div key={i} className="reply">
                        <p>{reply.content}</p>
                        <small>By: {reply.sender}</small>
                      </div>
                    ))}
                    <form onSubmit={(e) => sendReply(e, msg._id)}>
                      <input
                        type="text"
                        value={replyMessage[msg._id] || ''}
                        onChange={(e) =>
                          setReplyMessage({ ...replyMessage, [msg._id]: e.target.value })
                        }
                        placeholder="Type a reply..."
                        style={{ padding: '10px', width: '80%' }}
                      />
                      <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>
                        Reply
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {visibleMessages < chat.length && (
          <button onClick={handleViewMore} style={{ marginTop: '10px' }}>
            View More
          </button>
        )}
      </div>

      {/* Form to post a new question */}
      <div className="new-question-form">
        <h3>Post a New Question</h3>
        <form onSubmit={sendMessage}>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask your question..."
            rows="4"
            style={{ width: '100%', padding: '10px' }}
          />
          <input
            type="text"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="Enter hashtags, separated by commas"
            style={{ width: '100%', padding: '10px', marginTop: '10px' }}
          />
          <button type="submit" style={{ padding: '10px', marginTop: '10px' }}>
            Post Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default Community;
