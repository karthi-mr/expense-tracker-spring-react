import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth.tsx";
import type { ReactElement } from "react";
import LayoutComponent from "../components/LayoutComponent.tsx";

function PublicRoute({ children }: {children: ReactElement}): ReactElement {
  const { token } = useAuth();
  return !token
    ? <LayoutComponent>{children}</LayoutComponent>
    : <Navigate to={"/dashboard"} replace />;
}

export default PublicRoute;
