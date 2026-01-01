import { Navigate, Outlet } from "react-router-dom";
import type { ReactElement } from "react";

function isAuthenticated() {
  console.log("Checking authentication");
  const token: string | null = localStorage.getItem("token");
  return !!token;
}

function ProtectedRoutes(): ReactElement {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoutes;
