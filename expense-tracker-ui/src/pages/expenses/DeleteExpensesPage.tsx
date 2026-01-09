import { type ReactElement, useEffect, useState } from "react";
import { type NavigateFunction, useNavigate, useParams } from "react-router-dom";
import type { AxiosResponse } from "axios";
import { deleteExpense, findExpense } from "../../services/ExpenseService.ts";
import type { ExpenseResponse } from "../../model/ExpenseModel.ts";

function DeleteExpensesPage(): ReactElement {
  const [expenseName, setExpenseName] = useState<string>("");
  const navigator: NavigateFunction = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    findExpense(Number(id))
      .then((response: AxiosResponse<ExpenseResponse>) => {
        console.log(response);
        setExpenseName(response.data.expenseTitle)
      })
      .catch(error => console.log(error));
  }, [id]);

  function handleDeleteExpense() {
    deleteExpense(Number(id))
      .then(() => navigator("/expenses"))
      .catch(error => console.log(error));
  }

  console.log(`delete id: ${id}`);
  return (
    <div className="min-w-full flex items-center justify-center px-4 py-5">
      <div
        className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 md:p-8"
      >
        <h1 className="text-2xl font-medium text-center">Delete Expense</h1>
        <p className="mt-2 text-md text-center text-slate-400">Are you sure want to delete '{expenseName}' expense</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            className="w-full bg-red-700/90 hover:bg-red-800/80  rounded-lg px-3 py-1 text-sm transition
            cursor-pointer"
            onClick={handleDeleteExpense}
          >
            Delete Expense
          </button>
          <button
            className="w-full bg-slate-700 hover:bg-slate-800 rounded-lg px-3 py-1 text-sm transition
            cursor-pointer"
            onClick={() => navigator("/expenses")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteExpensesPage;
