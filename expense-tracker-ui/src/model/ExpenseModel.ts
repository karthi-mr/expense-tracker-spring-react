export type ExpenseRequest = {
  title: string;
  amount: number;
  categoryId: number;
};

export type ExpenseResponse = {
  expenseId: number;
  expenseTitle: string;
  amount: number;
  categoryId: number;
  categoryName: string;
  createdAt: Date;
  lastModifiedAt: Date;
}
