import React from "react";
import { getAccessToken, getRefreshToken, getTokenExpiresAt } from "./token";
import { Navigate, Outlet } from "react-router-dom";

const AuthMidleware: React.FC = () => {
  const accessToken = getAccessToken();
  const expiresAt = getTokenExpiresAt();

  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  // Access token yang sudah kedaluwarsa masih bisa dipakai selama refresh token
  // tersedia — interceptor yang akan menukarnya saat request pertama.
  if (expiresAt && Date.now() >= expiresAt && !getRefreshToken()) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default AuthMidleware;
