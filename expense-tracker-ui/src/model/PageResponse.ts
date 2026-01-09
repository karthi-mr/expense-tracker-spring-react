import type { CategoryResponse } from "./Catergory.ts";

export type PageResponse = {
  content: Array<CategoryResponse>;
  pageNumber: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};