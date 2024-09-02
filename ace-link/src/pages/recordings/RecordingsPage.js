import React, { useEffect, useState } from 'react';
import './Recorddings.css'; // Ensure your CSS file is up to date with the changes

const RecordingsPage = () => {
    const [recordings, setRecordings] = useState({
        audioRecordings: [],
        videoRecordings: []
    });
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('Audio Recordings');

    useEffect(() => {
        const fetchRecordings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/trust/recordings`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setRecordings({
                    audioRecordings: data.audioRecordings || [],
                    videoRecordings: data.videoRecordings || []
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching recordings:', error);
                setLoading(false);
            }
        };

        fetchRecordings();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="recordings-container">
            <div className="tabs">
                {['Audio Recordings', 'Video Recordings', 'Summary', 'Quiz', 'Flashcards'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`tab-button ${activeTab === tab ? 'active' : ''}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'Audio Recordings' && (
                <div className="recording-section">
                    <h2>Audio Recordings</h2>
                    {recordings.audioRecordings.length > 0 ? (
                        <ul className="recording-list">
                            {recordings.audioRecordings.map(audio => (
                                <li key={audio._id} className="recording-item">
                                    <audio controls className="media-player">
                                        <source src={`http://localhost:3000/${audio.filepath.replace(/\\/g, '/')}`} type={audio.mimetype} />
                                        Your browser does not support the audio element.
                                    </audio>
                                    {audio.transcription && (
                                        <p><strong>Transcription:</strong> {audio.transcription}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No audio recordings available.</p>
                    )}
                </div>
            )}

            {activeTab === 'Video Recordings' && (
                <div className="recording-section">
                    <h2>Video Recordings</h2>
                    {recordings.videoRecordings.length > 0 ? (
                        <ul className="recording-list">
                            {recordings.videoRecordings.map(video => (
                                <li key={video._id} className="recording-item">
                                    <video controls className="media-player">
                                        <source src={`http://localhost:3000/${video.filepath.replace(/\\/g, '/')}`} type={video.mimetype} />
                                        Your browser does not support the video element.
                                    </video>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No video recordings available.</p>
                    )}
                </div>
            )}

            {activeTab === 'Summary' && (
                <div className="recording-section">
                    <h2 className="section-title">Summary</h2>
                    {recordings.audioRecordings.length > 0 ? (
                        <ul className="summary-list">
                            {recordings.audioRecordings.map(audio => (
                                <li key={audio._id} className="summary-item">
                                    <div className="summary-content">
                                        <p><strong>{audio.title}</strong></p>
                                        <p>{audio.summary.replace(/\*\*/g, '')}</p>
                                    </div>
                                    <hr className="summary-divider" />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No summaries available.</p>
                    )}
                </div>
            )}

            {activeTab === 'Quiz' && (
                <div className="recording-section">
                    <h2>Quiz</h2>
                    {recordings.audioRecordings.length > 0 ? (
                        <ul className="recording-list">
                            {recordings.audioRecordings.map(audio => (
                                <QuizItem key={audio._id} quizzes={audio.quizzes} />
                            ))}
                        </ul>
                    ) : (
                        <p>No quizzes available.</p>
                    )}
                </div>
            )}

            {activeTab === 'Flashcards' && (
                <div className="flashcard-section">
                    <h2>Flashcards</h2>
                    {recordings.audioRecordings.length > 0 ? (
                        <ul className="recording-list">
                            {recordings.audioRecordings.map(audio => (
                                <FlashcardItem key={audio._id} flashcards={audio.flashcards} />
                            ))}
                        </ul>
                    ) : (
                        <p>No flashcards available.</p>
                    )}
                </div>
            )}
        </div>
    );
};

// Quiz Component
const QuizItem = ({ quizzes }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = quizzes.split('**Question').slice(1).map((quiz, index) => {
        const [questionPart, answerPart] = quiz.split('**Answer:');
        const question = questionPart.replace('**:', '').replace(/\*\*/g, '').trim();
        const answer = answerPart.replace(/\*\*/g, '').trim();
        return { question, answer };
    });

    const handleAnswerSubmit = () => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer.toLowerCase() === currentQuestion.answer.toLowerCase()) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
    };

    const handleNextQuestion = () => {
        setIsCorrect(null);
        setSelectedAnswer('');
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    if (currentQuestionIndex >= questions.length) {
        return <p>Quiz complete! You've answered all questions.</p>;
    }

    return (
        <div className="quiz-item">
            <div className="quiz-question">
                <strong>{questions[currentQuestionIndex].question}</strong>
            </div>
            <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Type your answer here..."
            />
            <button onClick={handleAnswerSubmit} className="tab-button">
                Submit Answer
            </button>
            {isCorrect !== null && (
                <div className={`quiz-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${questions[currentQuestionIndex].answer}`}
                </div>
            )}
            {isCorrect !== null && (
                <button onClick={handleNextQuestion} className="tab-button">
                    Next Question
                </button>
            )}
        </div>
    );
};

// Flashcard Component
const FlashcardItem = ({ flashcards }) => {
    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <>
            {flashcards.split('Card').slice(1).map((card, index) => {
                const [question, answer] = card
                    .split('Answer:')
                    .map(str => str.replace(/\*\*/g, '').trim());

                return (
                    <div key={index} className="flashcard-item">
                        <div className="flashcard">
                            <div className="flashcard-question">
                                <strong>Question:</strong> {question.split('Question:')[1].trim()}
                            </div>
                            {showAnswer && (
                                <div className="flashcard-answer">
                                    <strong>Answer:</strong> {answer}
                                </div>
                            )}
                            <button className="tab-button" onClick={() => setShowAnswer(!showAnswer)}>
                                {showAnswer ? 'Hide Answer' : 'Show Answer'}
                            </button>
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default RecordingsPage;
