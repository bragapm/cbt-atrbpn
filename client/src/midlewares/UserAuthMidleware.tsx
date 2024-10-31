import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getUserToken } from "./userToken";

const UserAuthMidleware: React.FC = () => {
  const accessToken = getUserToken();

  if (!accessToken) {
    return <Navigate to="/exam/login" replace />;
  }

  return <Outlet />;
};

export default UserAuthMidleware;
