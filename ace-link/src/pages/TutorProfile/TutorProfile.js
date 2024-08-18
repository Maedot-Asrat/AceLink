import React from "react";
import { useParams } from "react-router-dom";
import "./TutorProfile.css";
import TutorProfilePage from "../TutorProfilePage/TutorProfilePage.js";
import { Profiles } from "../../data.js";

export default function TutorProfile() {
  const { id } = useParams(); 
  console.log(id);
  console.log("URL ID:", id);
console.log("Profiles Data:", Profiles); // Get the id from the URL params
 // Find the matching profile
  const profile = Profiles.find((profile) => profile.id === id);
  console.log("Found Profile:", profile);
  if (!profile) {
    return <div>Profile not found</div>;  // If no profile matches the id, show a not found message
  }

  return (
    <div className="tutors">
      <TutorProfilePage
        key={profile.id}
        id={profile.id}
        image={profile.image}
        name={profile.name}
        title={profile.title}
        bio={profile.bio}
        cost={profile.cost}
        rating={profile.rating}
      />
    </div>
  );
}
