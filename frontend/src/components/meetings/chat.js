import React, { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: 'Tutor', text: 'Hello, how can I assist you today?' },
    { sender: 'Student', text: 'I find astronomy difficult to understand. Can you help me with it?' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { sender: 'Student', text: newMessage }]);
      setNewMessage('');
    }
  };

  return (
    <div>
      <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '5px', textAlign: msg.sender === 'Tutor' ? 'left' : 'right' }}>
            <strong>{msg.sender}: </strong><span>{msg.text}</span>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message"
        style={{ width: '80%', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSend} style={{ padding: '5px 10px', marginLeft: '5px', borderRadius: '5px', backgroundColor: '#007bff', color: '#fff', border: 'none' }}>
        Send
      </button>
    </div>
  );
};

export default Chat;
