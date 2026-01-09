import type { ReactElement } from "react";
import AuthPage from "./pages/AuthPage.tsx";
import { AuthProvider } from "./utils/AuthContext.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";
import DashboardPage from "./pages/common/DashboardPage.tsx";
import CategoriesPage from "./pages/categories/CategoriesPage.tsx";
import CreateOrEditCategories from "./pages/categories/CreateOrEditCategories.tsx";
import DeleteCategoriesPage from "./pages/categories/deleteCategoriesPage.tsx";

export default function App (): ReactElement {
  return (
    // <AuthPage />
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* public route */}
          <Route path="/login" element={
            <PublicRoute><AuthPage initialMode="login" /></PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute><AuthPage initialMode="signup" /></PublicRoute>
          } />

          {/* protected route */}
          <Route path="/dashboard" element={
            <ProtectedRoute><DashboardPage /></ProtectedRoute>
          } />
          <Route path="/categories">
            <Route index element={
              <ProtectedRoute><CategoriesPage /></ProtectedRoute>
            } />
            <Route
              path="create"
              element={<ProtectedRoute><CreateOrEditCategories /></ProtectedRoute>}
            />
            <Route
              path="update/:id"
              element={<ProtectedRoute><CreateOrEditCategories /></ProtectedRoute>}
            />
            <Route
              path="delete/:id"
              element={<ProtectedRoute><DeleteCategoriesPage /></ProtectedRoute>}
            />
          </Route>


          {/* default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}