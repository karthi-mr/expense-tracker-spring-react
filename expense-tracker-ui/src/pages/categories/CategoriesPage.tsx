import { type ReactElement, useEffect, useState } from "react";
import { enableDisableCategory, findAllCategories } from "../../services/CategoryService.ts";
import type { AxiosError, AxiosResponse } from "axios";
import type { PageResponse } from "../../model/PageResponse.ts";
import { type NavigateFunction, useNavigate } from "react-router-dom";
import PaginationComponent from "../../components/PaginationComponent.tsx";


const pageSizeOptions: Array<number> = [5, 10, 25, 50];
function CategoriesPage(): ReactElement {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [pageResponse, setPageResponse] = useState<PageResponse | undefined>(undefined);
  const navigator: NavigateFunction = useNavigate();

  useEffect(() => {
    findAllCategories(page, size)
      .then((response: AxiosResponse<PageResponse>) => {
        console.log(response.data);
        setPageResponse({
          content: response.data.content,
          first: response.data.first,
          last: response.data.last,
          pageNumber: response.data.pageNumber,
          size: response.data.size,
          totalElements: response.data.totalElements,
          totalPages: response.data.totalPages
        })
      })
      .catch((error: AxiosError) => console.log(error))
  }, [page, size])

  function handleEnableDisableCategory(categoryId: number): void {
    enableDisableCategory(categoryId)
      .then(() => {
        findAllCategories(page, size)
          .then((response: AxiosResponse<PageResponse>) => {
            console.log(response.data);
            setPageResponse({
              content: response.data.content,
              first: response.data.first,
              last: response.data.last,
              pageNumber: response.data.pageNumber,
              size: response.data.size,
              totalElements: response.data.totalElements,
              totalPages: response.data.totalPages
            })
          })
          .catch((error: AxiosError) => console.log(error))
      })
      .catch((error: AxiosError) => console.log(error))
  }

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 flex items-start justify-center px-4 py-10"
    >
      <div
        className="w-full max-w-3xl rounded-2xl bg-slate-900/80 border border-slate-800 shadow-2xl p-6 md:p-8"
      >

        {/* header */}
        <div
          className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Categories</h1>
            <p className="text-sm text-slate-400 mt-1">
              Manage your categories
            </p>
          </div>

          <div className="w-full md:w-40">
            {/* create category */}
            <button
              type="button"
              onClick={() => navigator("/categories/create")}
              className="w-full rounded-xl bg-blue-800/80 px-3 py-2 text-sm cursor-pointer
              hover:bg-blue-700 transition-colors"
            >
              Create Category
            </button>
          </div>
        </div>

        {/* table */}
        <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-900/90 border-b border-slate-800">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Category Name</th>
                <th className="px-4 py-3 text-left font-medium">Category Enabled</th>
                <th className="px-14 py-3 text-left font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!pageResponse || pageResponse.size === 0 || !pageResponse.content) && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center px-4 py-3 text-slate-500 font-semibold"
                  >
                    No Categories found. Please create new category
                  </td>
                </tr>
              )}
              {pageResponse?.content.map(category => (
                <tr
                  key={category.categoryId}
                  className="border-t border-slate-800 hover:bg-slate-800/60"
                >
                  <td className="px-4 py-3">{category.categoryName}</td>
                  <td className="px-12 py-3">{category.isEnabled ? "✅" : "❌"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex gap-1.5">
                      <button
                        className="px-2 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800
                        cursor-pointer transition-colors"
                        onClick={() => navigator(`/categories/update/${category.categoryId}`)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1.5 rounded-lg border border-red-700/30
                        bg-red-700/70 hover:bg-red-700 cursor-pointer transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        className={`px-2 py-1.5 rounded-lg border  cursor-pointer transition-colors 
                        ${category.isEnabled ? "border-red-700/30 bg-red-800/70 hover:bg-red-800" : 
                          "border-green-700/30 bg-green-700/70 hover:bg-green-700"}`}
                        onClick={() => handleEnableDisableCategory(category.categoryId)}
                      >
                        {category.isEnabled ? "Disable" : "Enable"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
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

export default CategoriesPage;
