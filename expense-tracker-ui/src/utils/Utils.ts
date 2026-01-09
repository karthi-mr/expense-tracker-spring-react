import type { AxiosError, AxiosResponse } from "axios";
import type { ExpenseResponse } from "../model/ExpenseModel.ts";

export const AMOUNT_SYMBOL: string = "₹";


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

export function formatDate(value: string | Date): string {
  const date: Date = value instanceof Date ? value : new Date(value);
  return date.toLocaleDateString("en-In", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

export function getTotalExpense(data: ExpenseResponse[]): number {
  let totalExpense: number = 0.00;
  data.map((expense: ExpenseResponse) => {
    totalExpense += expense.amount;
  });
  return totalExpense;
}

