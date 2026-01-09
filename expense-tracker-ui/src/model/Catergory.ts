export type CategoryRequest = {
  name: string;
};

export type CategoryResponse = {
  categoryId: number;
  categoryName: string;
  isEnabled: boolean;
}
