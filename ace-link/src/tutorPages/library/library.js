import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import './library.css';

const Library = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    file: null,
  });

  const [books, setBooks] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for popup visibility

  const baseURL = 'https://acelink-w1qp.onrender.com/';
  const fixImagePath = (path) => {
    return path.replace(/\\/g, '/');
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('https://acelink-w1qp.onrender.com/library');
        if (response.ok) {
          const fetchedBooks = await response.json();
          setBooks(fetchedBooks);
        } else {
          alert('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching books:', error);
        alert('Error fetching books');
      }
    };

    fetchBooks();
  }, []);

  const handleDownload = (fileName) => {
    const downloadUrl = `https://acelink-w1qp.onrender.com/${fileName}`;
    window.open(downloadUrl, '_blank');
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append('title', formData.title);
    formPayload.append('description', formData.description);
    formPayload.append('image', formData.image);
    formPayload.append('file', formData.file);

    try {
      const response = await fetch('https://acelink-w1qp.onrender.com/library/add', {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        const newBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, newBook]);
        alert('File uploaded successfully');
        setIsPopupOpen(false); // Close the popup after submission
      } else {
        alert('Failed to upload');
      }
    } catch (error) {
      console.error('Error uploading the file:', error);
      alert('Error uploading the file');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className='top'>
          <input type="text" className="search-bar" placeholder="Search for books..." />
          <button className="upload-button" onClick={() => setIsPopupOpen(true)}>
          <FaUpload className="download-icon" /> Upload a book
          </button>
        </div>
        <div className="book-cards">
          {books.map((book, index) => (
            <div className="outer-card" key={index}>
              <div className="book-card">
                <img src={baseURL + fixImagePath(book.image)} alt={book.title} className="book-image" />
                <div className="book-info">
                  <h3>{book.title}</h3>
                  <p className="description">{book.description}</p>
                </div>
                <button className="download-button" onClick={() => handleDownload(book.file)}>
                  <FaDownload className="download-icon" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>

        

        {isPopupOpen && (
          <div className="popup">
            <div className="popup-content">
              <span className="close-button" onClick={() => setIsPopupOpen(false)}>
                &times;
              </span>
              <form onSubmit={handleSubmit} className="upload-form">
                <h2>Upload New Book</h2>
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  Upload a cover picture
                  <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                </div>
                <div>
                  Upload Book
                  <input type="file" name="file" accept=".pdf,.doc,.docx" onChange={handleChange} required />
                </div>
                <button type="submit" className="upload-button">Upload</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
