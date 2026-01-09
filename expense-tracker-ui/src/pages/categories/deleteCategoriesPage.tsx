import { type ReactElement, useEffect, useState } from "react";
import { type NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { deleteCategory, findCategory } from "../../services/CategoryService.ts";
import type { AxiosResponse } from "axios";
import type { CategoryResponse } from "../../model/Catergory.ts";

function DeleteCategories(): ReactElement {
  const [categoryName, setCategoryName] = useState<string>("");
  const navigator: NavigateFunction = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    findCategory(Number(id))
      .then((response: AxiosResponse<CategoryResponse>) => {
        console.log(response);
        setCategoryName(response.data.categoryName)
      })
      .catch(error => console.log(error));
  }, [id]);

  function handleDeleteCategory() {
    deleteCategory(Number(id))
      .then(() => navigator("/categories"))
      .catch(error => console.log(error));
  }

  console.log(`delete id: ${id}`);
  return (
    <div className="min-w-full flex items-center justify-center px-4 py-5">
      <div
        className="w-full max-w-md rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 md:p-8"
      >
        <h1 className="text-2xl font-medium text-center">Delete Category</h1>
        <p className="mt-2 text-md text-center text-slate-400">Are you sure want to delete '{categoryName}' category</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            className="w-full bg-red-700/90 hover:bg-red-800/80  rounded-lg px-3 py-1 text-sm transition
            cursor-pointer"
            onClick={handleDeleteCategory}
          >
            Delete Category
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

export default DeleteCategories;
