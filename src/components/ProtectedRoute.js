// ProtectedRoute.js
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ element: Component, navigateTo, ...rest }) => {
  const isVerified = sessionStorage.getItem("token");
  const location = useLocation(); 
  
  if (!isVerified) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
