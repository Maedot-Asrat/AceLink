import React, { useState } from 'react';
import axios from 'axios';

const ChatbotPage = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Please enter a message.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3000/chatbot', { message });
      const reply = res.data.reply || 'No response from chatbot';

      setChatHistory(prevHistory => [...prevHistory, { question: message, answer: reply }]);
      setMessage('');
    } catch (err) {
      setError('Failed to communicate with the chatbot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h4 style={{ textAlign: 'center', color: '#333', marginBottom: '20px' }}>Ask AceLink Anything</h4>

      <div style={{
        maxHeight: '200px',
    
        overflowY: 'auto',
        padding: '15px',
        backgroundColor: '#000',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}>
        {chatHistory.map((chat, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <p style={{ fontWeight: 'bold', color: '#007BFF' }}>You:</p>
            <p style={{
              backgroundColor: '#e9ecef',
              padding: '10px',
              borderRadius: '10px',
              color: '#333',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>{chat.question}</p>

            <p style={{ fontWeight: 'bold', color: '#28a745', marginTop: '10px' }}>Chatbot:</p>
            <p style={{
              backgroundColor: '#e9ecef',
              padding: '10px',
              borderRadius: '10px',
              color: '#333',
              fontSize: '16px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>{chat.answer}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: '10px', color: '#555' }}>
          Your Message:
          <input 
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message here..."
            style={{
              width: '100%',
              padding: '10px',
              margin: '10px 0',
              borderRadius: '5px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              fontSize: '16px'
            }}
          />
        </label>
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
          }}
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </div>
  );
};

export default ChatbotPage;
