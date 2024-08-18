import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CoursesPage from './pages/coursepage';
import CourseDetail from './pages/coursedetail';
import SchedulePage from './pages/SchedulePage';

function App() {
  const [selectedCourse, setSelectedCourse] = React.useState(null);

  return (
    <Router>
      <div className="App">
        <CoursesPage />
        <Routes>
          <Route
            path="/courses"
            element={<CoursesPage onSelectCourse={setSelectedCourse} />}
          />
          <Route
            path="/courses/:id"
            element={<CourseDetail course={selectedCourse} />}
          />
          <Route 
            path="/schedules" element={<SchedulePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
