// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Profilecard from '../../components/profilecard/Profilecard';
// import './tutors.css';
// import Picture from "../../assets/picture.png";

// export default function Tutors() {
//   const [profiles, setProfiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTutorRecommendations = async () => {
//       try {
//         // Assuming you have the studentId stored in localStorage or passed down as a prop
//         const studentId = localStorage.getItem('studentId');
//         console.log(studentId);
//         const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/recommend-tutor`, { studentId });
//         const { tutors } = response.data;

//         setProfiles(tutors);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTutorRecommendations();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className="tutors">
//       {profiles.map(profile => (
//         <Profilecard
//           key={profile._id}
//           id={profile._id}
//           bio={profile.profile[0]?.qualifications || "No bio available"}
//           rating={profile.profile[0]?.rating || 0}
//           image={Picture}
//           name={profile.username}
//           title={profile.profile[0]?.subject_expertise?.join(', ') || "No title available"}
//           cost={profile.profile[0]?.cost || "N/A"}
//         />
//       ))}
//     </div>
//   );
// }
