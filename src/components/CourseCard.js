import React from 'react';

const CourseCard = ({ course }) => {
  return (
    <div className="course-card">
      <img src={course.image} alt={course.name} className="course-image" />
      <h3>{course.name}</h3>
      <p>{course.description}</p>
      <p>{course.enrolled} Enrolled</p>
      <button>View Course</button>
    </div>
  );
};

export default CourseCard;
