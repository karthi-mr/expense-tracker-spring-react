import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login.tsx";
import Register from "../pages/auth/Register.tsx";
import ProtectedRoutes from "./ProtectedRoute.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import type { ReactElement } from "react";

function AppRoutes(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* public routes */}
        <Route path="login" element={<Login /> } />
        <Route path="register" element={<Register /> } />


        {/* protected route */}
        <Route element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
