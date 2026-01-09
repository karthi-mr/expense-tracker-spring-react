import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth.tsx";
import type { ReactElement } from "react";

function ProtectedRoute({ children }: {children: ReactElement}): ReactElement {
  const { token } = useAuth();
  return token ? children : <Navigate to={"/login"} replace />;
}

export default ProtectedRoute;
