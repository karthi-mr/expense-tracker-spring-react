import { type AxiosResponse } from "axios";
import type { PageResponse } from "../model/PageResponse.ts";
import api from "./ApiUtils.ts";
import type { ExpenseRequest, ExpenseResponse } from "../model/ExpenseModel.ts";

const EXPENSE_ENDPOINT: string = "http://localhost:8082/api/v1/expense";

export function findAllExpenses(page: number = 0, size: number = 10):
  Promise<AxiosResponse<PageResponse<ExpenseResponse>, unknown>> {
  return api.get(EXPENSE_ENDPOINT, {
    params: {
      page: page,
      size: size
    }
  });
}

export function findExpense(expenseId: number): Promise<AxiosResponse<ExpenseResponse, unknown>> {
  return api.get(`${EXPENSE_ENDPOINT}/${expenseId}`);
}

export function addExpense(expenseRequest: ExpenseRequest): Promise<AxiosResponse<ExpenseResponse, unknown>> {
  return api.post(`${EXPENSE_ENDPOINT}`, expenseRequest);
}

export function updateExpense(expenseId: number, expenseRequest: ExpenseRequest):
  Promise<AxiosResponse<ExpenseResponse, unknown>> {
  return api.put(`${EXPENSE_ENDPOINT}/${expenseId}`, expenseRequest);
}

export function deleteExpense(expenseId: number): Promise<AxiosResponse<void, unknown>> {
  return api.delete(`${EXPENSE_ENDPOINT}/${expenseId}`);
}
