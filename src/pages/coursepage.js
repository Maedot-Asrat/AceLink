import React, { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard';
import { fetchCourses } from '../services/api.js';
import Sidebar from '../components/Columnbar';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
      } catch (error) {
        console.error('Failed to fetch the courses', error);
      }
    };

    getCourses();
  }, []);

  return (
    <div className="courses-page">
      <Sidebar/>
      <div className="courses-list">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
