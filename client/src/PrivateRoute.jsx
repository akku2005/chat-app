// PrivateRoute.jsx

import React from "react";
import { Route, Navigate } from "react-router-dom";

const isAuthenticated = () => {
  // Your authentication logic here
  return true; // For testing purposes, always return true
};

const PrivateRoute = ({ element: Element, ...rest }) => {
  return isAuthenticated() ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;
