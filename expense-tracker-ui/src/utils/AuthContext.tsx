import * as React from "react";
import { createContext, type ReactNode, useState } from "react";


type AuthProviderProps = {
  children: ReactNode;
};

export type AuthProviderValue = {
  token: string | null;
  login: (jwtToken: string) => void;
  logout: () => void;
};

const AuthContext: React.Context<AuthProviderValue> =
  createContext<AuthProviderValue>({
    token: null,
    login: () => {},
    logout: () => {}
  });
export default AuthContext

export function AuthProvider ({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  function login(jwtToken: string): void {
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
  }

  function logout(): void {
    localStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

