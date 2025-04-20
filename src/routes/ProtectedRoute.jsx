import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticated } from "../service/localStorageService";

const ProtectedRoute = () => {
  return getAuthenticated()? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
