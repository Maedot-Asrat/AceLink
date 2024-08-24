import React from 'react';

const GettingToKnowYouPage = () => {
    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '20px' }}>
            <h1>Getting to know you</h1>
            <p>Let's get you all set up so you can have the best experience in learning.</p>
            <div style={{ margin: '40px 0' }}>
                <label>Learning Style</label>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button style={buttonStyle}>Video call</button>
                    <button style={buttonStyle}>Video call</button>
                    <button style={{ ...buttonStyle, backgroundColor: '#0061F2', color: 'white' }}>Video call</button>
                </div>
            </div>
            <div style={{ margin: '40px 0' }}>
                <label>Current needs</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <button style={{ ...buttonStyle, backgroundColor: '#0061F2', color: 'white' }}>Video call</button>
                    <button style={buttonStyle}>Video call</button>
                    <button style={buttonStyle}>Video call</button>
                    <button style={buttonStyle}>Video call</button>
                    <button style={{ ...buttonStyle, backgroundColor: '#0061F2', color: 'white' }}>Video call</button>
                </div>
            </div>
            <div style={{ marginTop: '20px' }}>
                <label>Preferred language</label>
                <select style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                    <option>English</option>
                    <option>Amharic</option>
                    <option>French</option>
                </select>
            </div>
            <button 
                style={{ 
                    marginTop: '40px', 
                    width: '100%', 
                    padding: '15px', 
                    backgroundColor: '#002D72', 
                    color: 'white', 
                    borderRadius: '5px', 
                    border: 'none',
                    cursor: 'pointer'
                }}>
                Finish
            </button>
        </div>
    );
};

const buttonStyle = {
    width: '30%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    cursor: 'pointer',
    backgroundColor: 'white',
    color: '#333'
};

export default GettingToKnowYouPage;
