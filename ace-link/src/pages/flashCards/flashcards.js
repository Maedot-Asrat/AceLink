import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './flashCards.css';

const FlashcardsAndQuizzesPage = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
       const response = await fetch(`${process.env.REACT_APP_API_URL}/trust/recordings`); // Replace 'recordingId' with the actual recording ID
        const { flashcards, quizzes } = response.data;

        setFlashcards(parseFlashcards(flashcards));
        setQuizzes(parseQuizzes(quizzes));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const parseFlashcards = (flashcardsData) => {
    return flashcardsData.split('\n').map((card) => {
      const [question, answer] = card.split('?');
      return { question: question + '?', answer };
    });
  };

  const parseQuizzes = (quizzesData) => {
    return quizzesData.split('\n').map((quiz) => {
      const [question, ...options] = quiz.split('\n');
      return { question, options };
    });
  };

  return (
    <div className="flashcards-quizzes-page">
      <div className="flashcards-section">
        <h2>Flashcards</h2>
        <div className="flashcards-container">
          {flashcards.map((card, index) => (
            <div key={index} className="flashcard">
              <div className="question">{card.question}</div>
              <div className="answer">{card.answer}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="quizzes-section">
        <h2>Quizzes</h2>
        <div className="quizzes-container">
          {quizzes.map((quiz, index) => (
            <div key={index} className="quiz">
              <div className="question">{quiz.question}</div>
              <div className="options">
                {quiz.options.map((option, i) => (
                  <div key={i} className="option">{option}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsAndQuizzesPage;
