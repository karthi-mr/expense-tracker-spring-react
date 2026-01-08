import axios, { type AxiosResponse } from "axios";

const AUTHENTICATION_ENDPOINT: string = "http://localhost:8082/api/v1/auth";

export type AuthenticationResponse = {
  token: string;
}

export type AuthenticationRequest = {
  email: string;
  password: string;
}

export type RegistrationRequest = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export function authenticate(
  authRequest: AuthenticationRequest
): Promise<AxiosResponse<AuthenticationResponse, unknown>> {
  return axios.post(`${AUTHENTICATION_ENDPOINT}/authenticate`, authRequest);
}

export function register(
  authRequest: AuthenticationRequest
): Promise<AxiosResponse<unknown, unknown>> {
  return axios.post(`${AUTHENTICATION_ENDPOINT}/register`, authRequest);
}