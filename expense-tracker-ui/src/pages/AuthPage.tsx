import { type ChangeEvent, type FormEvent, type ReactElement, useState } from "react";
import {
  authenticate,
  type AuthenticationRequest, type AuthenticationResponse,
  register,
  type RegistrationRequest
} from "../services/AuthService.ts";
import type { AxiosError, AxiosResponse } from "axios";
import { extractErrorMessage } from "../utils/Utils.ts";
import { useAuth } from "../utils/UseAuth.tsx";
import { type NavigateFunction, useNavigate } from "react-router-dom";

type Mode = "login" | "signup";
type LoginRegisterForm = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

type AuthPageProps = {
  initialMode: Mode;
};

function AuthPage({ initialMode }: AuthPageProps): ReactElement {
  const { login } = useAuth();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [loginRegisterForm, setLoginRegisterForm] = useState<LoginRegisterForm>({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState<string | undefined>(undefined);
  const navigator: NavigateFunction = useNavigate();

  function handleSubmit(e: FormEvent): void {
    e.preventDefault();
    setError(undefined);
    console.log(loginRegisterForm);
    if (loginRegisterForm.email.trim() === "") {
      setError("Email should not be empty");
      return;
    } else if (loginRegisterForm.password.trim() === "") {
      setError("Password should not be empty");
      return;
    } else if (mode === "signup" && loginRegisterForm.firstname.trim() === "") {
      setError("Firstname should not be empty");
      return;
    } else if (mode === "signup" && loginRegisterForm.lastname.trim() === "") {
      setError("Lastname should not be empty");
      return;
    }
    console.log(`Submitted ${mode} form`);
    if (mode === "login") {
      const authRequest: AuthenticationRequest =
        {email: loginRegisterForm.email, password: loginRegisterForm.password}
      authenticate(authRequest)
        .then((response: AxiosResponse<AuthenticationResponse>) => {
          const token: string = response.data.token;
          console.log(token);
          login(token);
          navigator("/dashboard");
        })
        .catch((error: AxiosError) => {
          setError(extractErrorMessage(error));
        });
    } else {
      const registerRequest: RegistrationRequest = loginRegisterForm;
      register(registerRequest)
        .then(() => handleModeSwitch("login"))
        .catch((error: AxiosError) => {
          setError(extractErrorMessage(error));
        });
    }
  }

  function handleUpdateField(key: string, value: string): void {
    setLoginRegisterForm({
      ...loginRegisterForm,
      [key]: value
    });
  }

  function handleModeSwitch(modeType: Mode): void {
    setMode(modeType);
    setError(undefined);
    setLoginRegisterForm({
      firstname: "",
      lastname: "",
      email: "",
      password: ""
    })
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-500
      via-purple-500 to-pink-500 px-4"
    >
      <div
        className="w-full max-w-md rounded-3xl bg-white/80 shadow-2xl backdrop-blur-xl
        p-8 transition-all"
      >
        {/* toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full bg-slate-100 p-1">
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all cursor-pointer
              ${
                mode === "login"
                  ? "bg-white shadow text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => handleModeSwitch("login")}
            >
              Login
            </button>
            <button
              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all cursor-pointer
              ${
                mode === "signup"
                  ? "bg-white shadow text-slate-900"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => handleModeSwitch("signup")}
            >
              Signup
            </button>
          </div>
        </div>

        {/* title */}
        <h2 className="text-xl font-semibold text-center text-slate-900 mb-2">
          {mode === "login" ? "Welcome back 👏" : "Create your account"}
        </h2>
        <p className="text-center text-sm text-slate-500 mb-6">
          {
            mode === "login"
              ? "Please sign in to continue"
              : "Join with us by signing up"
          }
        </p>

        {error && (
          <div
            className="w-full px-3 py-2 mb-4 bg-red-600/80 text-white rounded-full
            flex items-center justify-center text-wrap"
          >
            <span className="truncate text-sm px-2 py-1" title={error}>
              {error}
            </span>
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* firstname for signup */}
          {mode === "signup" && (
            <div>
              <label
                htmlFor="firstname"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Firstname
              </label>
              <input
                type="text"
                id="firstname"
                required
                className="w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3
                text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your First name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUpdateField("firstname", e.target.value)}
              />
            </div>
          )}

          {/* lastname for signup */}
          {mode === "signup" && (
            <div>
              <label
                htmlFor="lastname"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Lastname
              </label>
              <input
                type="text"
                id="lastname"
                required
                className="w-full rounded-xl border border-slate-200 bg-white/60 px-4 py-3
                text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your Last name"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUpdateField("lastname", e.target.value)}
              />
            </div>
          )}

          {/* email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4
                text-slate-400 text-sm"
              >
                ✉️
              </span>
              <input
                type="email"
                id="email"
                required
                className="w-full rounded-xl border border-slate-200 bg-white/60 pl-10 pr-4 py-3
                text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUpdateField("email", e.target.value)}
              />
            </div>
          </div>

          {/* password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span
                className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4
                text-slate-400 text-sm"
              >
                🔒
              </span>
              <input
                type="password"
                required
                id="password"
                className="w-full rounded-xl border border-slate-200 bg-white/60 pl-10 pr-4 py-3
                text-sm text-slate-900 placeholder-slate-400 outline-none focus:ring-2
                focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleUpdateField("password", e.target.value)}
              />
            </div>
          </div>

          {/* primary button */}
          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-linear-to-r from-blue-600 to-indigo-600 py-3 text-sm
            font-semibold text-white shadow-lg shadow-indigo-500/40 hover:brightness-110
            transition-all cursor-pointer"
          >
            {mode === "login" ? "Login" : "Create account"}
          </button>
        </form>

        {/* bottom text */}
        <div className="mt-6 text-center text-sm text-slate-500">
          {mode === "login" ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("signup")}
                className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => handleModeSwitch("login")}
                className="font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
