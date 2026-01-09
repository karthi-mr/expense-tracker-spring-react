import { type AxiosResponse } from "axios";
import type { PageResponse } from "../model/PageResponse.ts";
import api from "./ApiUtils.ts";

const CATEGORY_ENDPOINT: string = "http://localhost:8082/api/v1/category";

export function findAllCategories(page: number = 0, size: number = 10):
  Promise<AxiosResponse<PageResponse, unknown>> {
  return api.get(CATEGORY_ENDPOINT, {
    params: {
      page: page,
      size: size
    }
  });
}

export function enableDisableCategory(categoryId: number):
  Promise<AxiosResponse<PageResponse, unknown>> {
  return api.patch(`${CATEGORY_ENDPOINT}/${categoryId}`);
}