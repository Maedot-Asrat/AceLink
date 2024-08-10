import React from 'react';
import { Route } from 'react-router-dom';
import Community from './components/community/community';
import Meeting from './components/meetings/meetings';
import TutorRecommendations from './components/tutors/tutors';


const Routes = () => {
  return (
    <Routes>
      <Route exact path="/tutors" component={TutorRecommendations} />
      {/* <Route exact path="/my-courses" component={MyCourses} />
      <Route exact path="/study-groups" component={StudyGroups} /> */}
      <Route exact path="/community" component={Community} />
      <Route exact path="/schedules" component={Meeting} />
      {/* <Route exact path="/messages" component={Messages} />
      <Route exact path="/library" component={Library} /> */}
    
    </Routes>
  );
};

export default Routes;
