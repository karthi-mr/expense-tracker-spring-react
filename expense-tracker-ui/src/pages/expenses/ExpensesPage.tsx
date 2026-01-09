import { type ReactElement, useEffect, useState } from "react";
import type { AxiosError, AxiosResponse } from "axios";
import type { PageResponse } from "../../model/PageResponse.ts";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import PaginationComponent from "../../components/PaginationComponent.tsx";
import { findAllExpenses } from "../../services/ExpenseService.ts";
import type { ExpenseResponse } from "../../model/ExpenseModel.ts";
import { AMOUNT_SYMBOL, formatDate, getTotalExpense } from "../../utils/Utils.ts";


const pageSizeOptions: Array<number> = [5, 10, 25, 50];
function ExpensesPage(): ReactElement {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [totalExpense, setTotalExpense] = useState<number>(0.00);
  const [pageResponse, setPageResponse] = useState<PageResponse<ExpenseResponse> | undefined>(undefined);
  const navigator: NavigateFunction = useNavigate();

  useEffect(() => {
    findAllExpenses(page, size)
      .then((response: AxiosResponse<PageResponse<ExpenseResponse>>) => {
        setTotalExpense(getTotalExpense(response.data.content));
        setPageResponse({
          content: response.data.content,
          first: response.data.first,
          last: response.data.last,
          pageNumber: response.data.pageNumber,
          size: response.data.size,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages
        });
      })
      .catch((error: AxiosError) => console.log(error))
  }, [page, size]);

  return (
    <div className="min-w-full min-h-full flex items-start justify-center px-4 py-5">
      <div
        className="w-full max-w-5xl rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 md:p-8"
      >

        {/* header */}
        <div
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Expenses</h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your expenses
            </p>
          </div>

          <div className="w-full md:w-40">
            {/* create expense */}
            <button
              type="button"
              onClick={() => navigator("/expenses/create")}
              className="w-full rounded-xl bg-blue-800/80 px-3 py-2 text-sm cursor-pointer
              hover:bg-blue-700 transition-colors"
            >
              Create Expense
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/90 border-b border-slate-800">
              <tr className="divide-x divide-slate-700">
                <th className="px-4 py-3 text-center font-medium">Expense Title</th>
                <th className="px-4 py-3 text-center font-medium">Expense Amount</th>
                <th className="px-4 py-3 text-center font-medium">Category</th>
                <th className="px-4 py-3 text-center font-medium">Created At</th>
                <th className="px-4 py-3 text-center font-medium">Last Modified At</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!pageResponse || pageResponse.totalElements === 0 || !pageResponse.content) && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center px-4 py-3 text-slate-500 font-semibold"
                  >
                    No Expense found. Please create new expense
                  </td>
                </tr>
              )}
              {pageResponse && pageResponse.content.map((expense: ExpenseResponse) => (
                <tr
                  key={expense.expenseId}
                  className="border-t border-slate-800 hover:bg-slate-800/60 divide-x divide-slate-700"
                >
                  <td className="px-4 py-3 text-center truncate" title={expense.expenseTitle}>
                    {expense.expenseTitle.length >= 20
                      ? `${expense.expenseTitle.slice(0, 20)}...`
                      : expense.expenseTitle}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {`${AMOUNT_SYMBOL}${expense.amount.toFixed(2)}`}
                  </td>
                  <td className="px-4 py-3 text-center truncate" title={expense.categoryName}>
                    {expense.categoryName.length >= 20
                      ? `${expense.categoryName.slice(0, 20)}...`
                      : expense.categoryName}
                  </td>
                  <td className="px-4 py-3 text-center">{formatDate(expense.createdAt)}</td>
                  <td className="px-4 py-3 text-center">
                    {new Date(expense.lastModifiedAt) < new Date(expense.createdAt)
                      ? "-" : formatDate(expense.lastModifiedAt)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1.5">
                      <button
                        className="px-2 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800
                        cursor-pointer transition-colors"
                        onClick={() => navigator(`/expenses/update/${expense.expenseId}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1.5 rounded-lg border border-red-700/30
                        bg-red-700/70 hover:bg-red-700 cursor-pointer transition-colors"
                        onClick={() => navigator(`/expenses/delete/${expense.expenseId}`)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-slate-800 hover:bg-slate-800/60 divide-x divide-slate-700">
                <td className="px-4 py-3 text-center font-medium">Total Expense</td>
                <td className="px-4 py-3 text-center font-medium">
                  ${totalExpense.toFixed(2)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* footer */}
        <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          {/* page size dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              Rows per page:
            </span>
            <select
                value={size}
                onChange={(e) =>
                  setSize(Number(e.target.value))}
                className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg text-xs"
            >
              {pageSizeOptions.map((option: number) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          {/* pagination */}
          {pageResponse && (
            <PaginationComponent
              currentPage={pageResponse.pageNumber}
              totalPages={pageResponse.totalPages}
              onPageChange={setPage}
              isFirst={pageResponse.first}
              isLast={pageResponse.last} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpensesPage;
