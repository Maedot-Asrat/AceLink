import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetail = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    // fetch(${id}`)let us insert end point for courses detail fetching
    fetch()
      .then(response => response.json())
      .then(data => setCourse(data));
  }, [id]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-detail">
      <h2>{course.title}</h2>
      <div className="course-info">
        <div className="course-description">
          <h4>Description</h4>
          <p>{course.description}</p>
        </div>
        <div className="course-meta">
          <p><strong>Prepared by:</strong> {course.teacher}</p>
          <p><strong>Schedule:</strong> {course.schedule}</p>
          <p><strong>Enrolled:</strong> {course.enrolled} students</p>
        </div>
      </div>
      <button className="enroll-button">Enroll Now</button>
    </div>
  );
}

export default CourseDetail;
