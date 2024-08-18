import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Or wherever you store the token

  return token ? children : <Navigate to="/loginStudent" />;
};

export default PrivateRoute;
