import type { ReactElement } from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isFirst: boolean;
  isLast: boolean;
}

function PaginationComponent({
                               currentPage,
                               totalPages,
                               onPageChange,
                               isFirst,
                               isLast
} : PaginationProps): ReactElement {

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  function handlePrev(): void {
    if (!isFirst) {
      onPageChange(currentPage - 1);
    }
  }

  function handleNext(): void {
    if (!isLast) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <div className="mt-4 flex items-center justify-center">
      {/* prev / next */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={isFirst}
          className="px-3 py-1 text-sm rounded-lg border border-slate-600 disabled:opacity-40
           disabled:cursor-not-allowed cursor-pointer hover:bg-slate-700 transition"
        >
          Prev
        </button>

      {/* page numbers */}
      <div className="flex flex-wrap items-center gap-2">
        {pages.map((page: number) => (
          <button
            key={page}
            onClick={() => onPageChange(page - 1)}
            className={`px-3 py-1 text-sm rounded-lg border transition
            ${
              page === currentPage + 1
              ? "bg-blue-600 border-blue-500 text-white"
              : "border-slate-600 text-slate-200 hover:bg-slate-700"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={handleNext}
          disabled={isLast}
          className="px-3 py-1 text-sm rounded-lg border border-slate-600 disabled:opacity-40
           disabled:cursor-not-allowed cursor-pointer hover:bg-slate-700 transition"
        >
          Next
        </button>
        </div>
      </div>
    </div>
  );
}

export default PaginationComponent;
