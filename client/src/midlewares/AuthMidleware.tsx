import React from "react";
import { getAccessToken } from "./token";
import { Navigate, Outlet } from "react-router-dom";

const AuthMidleware: React.FC = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AuthMidleware;
