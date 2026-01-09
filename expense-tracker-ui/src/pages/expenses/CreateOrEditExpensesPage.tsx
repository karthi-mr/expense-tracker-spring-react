import { type ReactElement, useEffect, useState } from "react";
import { type NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { getAllCategories } from "../../services/CategoryService.ts";
import type { CategoryResponse } from "../../model/Catergory.ts";
import type { AxiosError, AxiosResponse } from "axios";
import type { ExpenseRequest, ExpenseResponse } from "../../model/ExpenseModel.ts";
import { addExpense, findExpense, updateExpense } from "../../services/ExpenseService.ts";

function CreateOrEditExpensesPage(): ReactElement {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [expense, setExpense] = useState<ExpenseRequest>({title: "", amount: 0.00, categoryId: 0});
  const navigator: NavigateFunction = useNavigate();
  const { id } = useParams();

  const isEditMode: boolean = id !== undefined;

  useEffect(() => {
    getAllCategories()
      .then((response: AxiosResponse<CategoryResponse[]>) => {
        setCategories(response.data);
      })
      .catch((error: AxiosError) => console.log(error));
  }, []);

  useEffect(() => {
    if (isEditMode) {
      findExpense(Number(id))
        .then((response: AxiosResponse<ExpenseResponse>) => {
          setExpense({
            title: response.data.expenseTitle,
            amount: response.data.amount,
            categoryId: response.data.categoryId
          })
        })
        .catch((error: AxiosError) => console.log(error));
    }
  }, [id, isEditMode]);

  function handleAddOrUpdateCategory(): void {
    if (expense.title.trim() === "" || expense.amount === 0 || !expense.categoryId) {
      alert("Invalid details provided");
      console.log(expense);
      return;
    }
    const expenseRequest: ExpenseRequest = {
      title: expense.title,
      amount: expense.amount,
      categoryId: Number(expense.categoryId)
    };
    if (!isEditMode) {
      addExpense(expenseRequest)
        .then(() => navigator("/expenses"))
        .catch((error) => console.log(error));
    } else {
      updateExpense(Number(id), expense)
        .then(() => navigator("/expenses"))
        .catch((error) => console.log(error));
    }
  }

  function handleUpdateExpenseForm(key: string, value: string): void {
    setExpense({
      ...expense,
      [key]: value
    });
  }

  return (
    <div className="min-w-full flex justify-center px-4 py-5">
      <div
        className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 md:p-8"
      >
        <h1 className="text-2xl font-medium text-center">{isEditMode ? "Edit" : "Add"} Expense</h1>
        <p className="mt-2 text-md text-center text-slate-400">
          Enter values to {isEditMode ? "update old" : "create new"} expense.
        </p>
        <form>
          <input
            type="text"
            className="mt-4 w-full bg-slate-800/80 rounded-lg px-4 py-2 border border-slate-700 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            autoFocus={!isEditMode}
            value={expense.title}
            placeholder="Enter expense title"
            onChange={(e) => handleUpdateExpenseForm("title", e.target.value)}
          />
          <input
            type="number"
            className="mt-4 w-full bg-slate-800/80 rounded-lg px-4 py-2 border border-slate-700 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={expense.amount}
            required
            placeholder="Enter expense amount"
            onChange={(e) => handleUpdateExpenseForm("amount", e.target.value)}
          />
          <div className="relative mt-4">
            <select
              className="w-full bg-slate-900/80 border border-slate-700/80 rounded-lg px-3 py-2 pr-10 text-sm
              text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500
              focus:border-blue-500 appearance-none"
              onChange={(e) => handleUpdateExpenseForm("categoryId", e.target.value)}
              required
              value={expense.categoryId}
            >
              <option value={0} disabled hidden>-- Select Category --</option>
              {categories.map((category: CategoryResponse) => (
                <option
                  key={category.categoryId}
                  disabled={!category.isEnabled}
                  value={category.categoryId}
                  className="focus-visible:bg-red-600"
                >
                  {category.categoryName}
                </option>
              ))}
            </select>
            {/* Custom arrow */}
            <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-slate-500">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
        </form>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            className="w-full bg-blue-700 hover:bg-blue-800  rounded-lg px-3 py-1 text-sm transition
            cursor-pointer disabled:bg-blue-700/70"
            disabled={expense.title.trim().length === 0}
            onClick={handleAddOrUpdateCategory}
          >
            {isEditMode ? "Update" : "Create"} Expense
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

export default CreateOrEditExpensesPage;
