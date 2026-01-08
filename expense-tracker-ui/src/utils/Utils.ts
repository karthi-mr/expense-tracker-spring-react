import type { AxiosError, AxiosResponse } from "axios";

export function extractErrorMessage(error: AxiosError): string {
  let errorMessage: string = "Unknown error occurred";
  console.log(error);
  const response: AxiosResponse | undefined = error.response;
  if (response !== undefined && response !== null) {
    const data = response.data;
    if (data !== undefined && data !== null) {
      errorMessage = data.message;
    }
  }
  return errorMessage;
}