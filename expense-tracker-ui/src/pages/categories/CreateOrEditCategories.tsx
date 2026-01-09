import { type ReactElement, useEffect, useState } from "react";
import { type NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { addCategory, findCategory, updateCategory } from "../../services/CategoryService.ts";
import type { ExpenseRequest, CategoryResponse } from "../../model/Catergory.ts";
import type { AxiosResponse } from "axios";

function CreateOrEditCategories(): ReactElement {
  const [categoryName, setCategoryName] = useState<string>("");
  const navigator: NavigateFunction = useNavigate();
  const { id } = useParams();

  const isEditMode: boolean = id !== undefined;

  useEffect(() => {
    findCategory(Number(id))
      .then((response: AxiosResponse<CategoryResponse>) => {
        console.log(response);
        setCategoryName(response.data.categoryName)
      })
      .catch(error => console.log(error));
  }, [id]);

  function handleAddOrUpdateCategory(): void {
    const categoryRequest: ExpenseRequest = {"name": categoryName};
    if (!isEditMode) {
      addCategory(categoryRequest)
        .then(() => navigator("/categories"))
        .catch((error) => console.log(error));
    } else {
      updateCategory(Number(id), categoryRequest)
        .then(() => navigator("/categories"))
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="min-w-full flex justify-center px-4 py-5">
      <div
        className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 md:p-8"
      >
        <h1 className="text-2xl font-medium text-center">Add Category</h1>
        <p className="mt-2 text-md text-center text-slate-400">Enter a name for the new category.</p>
        <input
          type="text"
          className="mt-4 w-full bg-slate-800/80 rounded-lg px-4 py-2 border border-slate-700 text-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoryName}
          placeholder="Enter category name"
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            className="w-full bg-blue-700 hover:bg-blue-800  rounded-lg px-3 py-1 text-sm transition
            cursor-pointer disabled:bg-blue-700/70"
            disabled={categoryName.trim().length === 0}
            onClick={handleAddOrUpdateCategory}
          >
            {isEditMode ? "Update" : "Create"} Category
          </button>
          <button
            className="w-full bg-slate-700 hover:bg-slate-800 rounded-lg px-3 py-1 text-sm transition
            cursor-pointer"
            onClick={() => navigator("/categories")}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateOrEditCategories;
