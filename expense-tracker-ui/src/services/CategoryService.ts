import { type AxiosResponse } from "axios";
import type { PageResponse } from "../model/PageResponse.ts";
import api from "./ApiUtils.ts";
import type { CategoryResponse, CategoryRequest } from "../model/Catergory.ts";

const CATEGORY_ENDPOINT: string = "http://localhost:8082/api/v1/category";

export function findAllCategories(page: number = 0, size: number = 10):
  Promise<AxiosResponse<PageResponse<CategoryResponse>, unknown>> {
  return api.get(CATEGORY_ENDPOINT, {
    params: {
      page: page,
      size: size
    }
  });
}

export function getAllCategories():
  Promise<AxiosResponse<CategoryResponse[], unknown>> {
  return api.get(`${CATEGORY_ENDPOINT}/get`);
}

export function enableDisableCategory(categoryId: number): Promise<AxiosResponse<void, unknown>> {
  return api.patch(`${CATEGORY_ENDPOINT}/${categoryId}`);
}

export function findCategory(categoryId: number): Promise<AxiosResponse<CategoryResponse, unknown>> {
  return api.get(`${CATEGORY_ENDPOINT}/${categoryId}`);
}

export function addCategory(categoryRequest: CategoryRequest): Promise<AxiosResponse<CategoryResponse, unknown>> {
  return api.post(`${CATEGORY_ENDPOINT}`, categoryRequest);
}

export function updateCategory(categoryId: number, categoryRequest: CategoryRequest):
  Promise<AxiosResponse<CategoryResponse, unknown>> {
  return api.put(`${CATEGORY_ENDPOINT}/${categoryId}`, categoryRequest);
}

export function deleteCategory(categoryId: number): Promise<AxiosResponse<void, unknown>> {
  return api.delete(`${CATEGORY_ENDPOINT}/${categoryId}`);
}
