import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticated } from "../service/localStorageService";

const ProtectedRoute = () => {
  console.log("auth: ", getAuthenticated());
  return getAuthenticated()? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
