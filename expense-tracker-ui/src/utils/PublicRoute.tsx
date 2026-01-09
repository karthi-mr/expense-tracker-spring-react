import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth.tsx";
import type { ReactElement } from "react";

function PublicRoute({ children }: {children: ReactElement}): ReactElement {
  const { token } = useAuth();
  return !token ? children : <Navigate to={"/dashboard"} replace />;
}

export default PublicRoute;
