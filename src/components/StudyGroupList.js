import React from 'react';
import StudyGroupCard from './studygroupcard';

const StudyGroupList = ({ groups }) => {
  return (
    <div className="study-group-list">
      {groups.map(group => (
        <StudyGroupCard 
          key={group.id} 
          title={group.title} 
          description={group.description} 
          image={group.image}
        />
      ))}
    </div>
  );
};

export default StudyGroupList;
