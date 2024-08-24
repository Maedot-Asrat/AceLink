import React from 'react';
import { FaDownload } from 'react-icons/fa';
import './library.css';
import image from '../../assets/book.jpg'

const Library = () => {
  const books = [
    {
      title: "Extreme Mathematics",
      subtitle: "Mastering the Art of Prompt Writing",
      description: "Prompt writing involves crafting clear and engaging prompts, while using images to create...",
      imageUrl: "/book.jpg",
      fileName: "math.pdf"  // Include the file name or path relative to the backend uploads folder
    },
    {
      title: "Introduction to AI",
      subtitle: "Mastering the Art of Prompt Writing",
      description: "Prompt writing involves crafting clear and engaging prompts, while using images to create...",
      imageUrl: "https://via.placeholder.com/150",
      fileName: "math.pdf"
    },
    {
      title: "Math",
      subtitle: "Mastering the Art of Prompt Writing",
      description: "Prompt writing involves crafting clear and engaging prompts, while using images to create...",
      imageUrl: "https://via.placeholder.com/150",
      fileName: "math.pdf"
    },
  ];

  const handleDownload = (fileName) => {
    // Replace 'http://localhost:3000' with your actual backend URL
    const downloadUrl = `http://127.0.0.1:3000/uploads/${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  return (
    <div className="dashboard-container">
      <div></div>

      <div className="main-content">
        <input type="text" className="search-bar" placeholder="Search for books..." />

        <div className="book-cards">
          {books.map((book, index) => (
            <div className="auter-card" key={index}>
              <div className="book-card">
                <img src={image} alt={book.title} className="book-image" />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="subtitle">{book.subtitle}</p>
                  <p className="description">{book.description}</p>
                </div>
              </div>
              <button 
                className="download-button" 
                onClick={() => handleDownload(book.fileName)}
              >
                <FaDownload className="download-icon" /> Download
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
