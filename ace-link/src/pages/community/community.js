import React, { useEffect, useRef, useState } from 'react';
import avatar from '../../assets/Avatar.png';
import bookmarkicon from '../../assets/bookmark.png';
// import Sidebar from '../sidebar/sidebar';
import './Community.css';

const Community = () => {
  const [expandedQuestionIndex, setExpandedQuestionIndex] = useState(null); // Track which question is expanded
  const expandedRef = useRef(null);

  const questions = [
    {
      title: "Custom UIView intrinsicContentSize width gets ridiculously large values or zero issue.",
      description: "I have two screens the first of login and the second shows the user information. On the login screen I keep the user_id value in user.defaults and when I go to the second screen I use ...",
      votes: 7,
      answers: 1,
      views: 300,
      user: "Naktibalda",
      time: "4 mins ago",
      tags: ["ios", "uiview", "uilabel", "interface-builder", "intrinsic-content-size"],

      expandedContent: [
        {
          user: "Jonathan Araujo",
          answer: "AudioKit 5 definitely does support Xcode 12 - however maybe you are using the wrong branch. You should really be checking out the v5-develop branch instead of master for the latest changes...",
          votes: 289,
          accepted: true,
          time: "4 mins ago",
        },
        {
          user: "Owens",
          answer: "You are the operator of a junction and you hear a Git branch coming. You have no idea which way it is supposed to go. You stop the train to ask the driver which direction they want. And then you set the switch appropriately to open them.",
          votes: 4,
          accepted: false,
          time: "4 mins ago",
        },
      ]
    },
    // You can add more questions here...
  ];

  const toggleExpand = (index) => {
    setExpandedQuestionIndex(expandedQuestionIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (expandedRef.current && !expandedRef.current.contains(event.target)) {
      setExpandedQuestionIndex(null);
    }
  };

  useEffect(() => {
    if (expandedQuestionIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expandedQuestionIndex]);

  return (
    <div className="community-page">
  
      <div className="community-content">
        <h2>Community</h2>
        <h3>Top Questions</h3>
        {questions.map((question, index) => (
          <div
            key={index}
            className="question-card"
            ref={expandedQuestionIndex === index ? expandedRef : null}
          >
            <div className="b">
              <div>
                <img src={bookmarkicon} alt='bookmarkicon' className='bookmarkicon' />
              </div>
              <div>
                <div className="a">
                  <div className="question-header">
                    <h4>{question.title}</h4>
                    <p className="question-description">{question.description}</p>
                  </div>
                  <div className="question-meta">
                    <div className="vote-section">
                      <span className="vote-icon">▲</span>
                      <span className="vote-count">{question.votes}</span>
                      <span className="vote-text">votes</span>
                      <span className="vote-icon">▼</span>
                    </div>
                    <div className="answer-section">
                      <div className="answer-box">
                        ✓ {question.answers} answer
                      </div>
                    </div>
                    <div className="view-section">
                      <span className="view-count">{question.views}</span>
                      <span className="view-text">views</span>
                    </div>
                  </div>
                </div>
                <div className="question-tags">
                  <div>
                    {question.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="user-info">
                    <img src={avatar} alt="User" className="user-icon" />
                    <span className="user-name">{question.user}</span>
                    <span className="time">{question.time}</span>
                  </div>
                  {expandedQuestionIndex !== index && (
                    <div className="question-info">
                      <a 
                        href="#answer" 
                        className="see-answer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation(); // Prevent the click from reaching the document
                          toggleExpand(index);
                        }}
                      >
                        See Answer
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {expandedQuestionIndex === index && (
              <div className="expanded-content">
                {question.expandedContent.map((answer, answerIndex) => (
                  <div key={answerIndex} className="answer-section">
                    <div className="answer-meta">
                      <span className={`accepted-answer ${answer.accepted ? 'accepted' : ''}`}>
                        {answer.accepted ? 'Accepted Answer' : 'Answer'}
                      </span>
                      <span className="answer-votes">{answer.votes} votes</span>
                    </div>
                    <p>{answer.answer}</p>
                    <div className="answer-user-info">
                      <span>{answer.user}</span>
                      <span>{answer.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
