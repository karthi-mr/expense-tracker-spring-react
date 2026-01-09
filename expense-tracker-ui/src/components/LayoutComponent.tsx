import type { ReactElement } from "react";
import NavbarComponent from "./NavbarComponent.tsx";

type LayoutProps = {
  children: ReactElement;
}

function LayoutComponent({ children }: LayoutProps): ReactElement {
  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 overflow-auto"
    >
      <NavbarComponent />
      <main className="min-w-screen flex items-start justify-center">
        {children}
      </main>
    </div>
  );
}

export default LayoutComponent;
