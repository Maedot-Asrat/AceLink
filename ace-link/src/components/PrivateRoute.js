import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const userRole = localStorage.getItem('role'); // Store and retrieve user role similarly

  if (!token) {
    return <Navigate to="/loginStudent" />;
  }

  // If a role is specified, check that the user's role matches
  if (role && userRole !== role) {
    // Redirect to a role-specific dashboard or a default page
    return <Navigate to={userRole === 'Student' ? '/dashboard' : '/dashboardTutor'} />;
  }

  return children;
};

export default PrivateRoute;
