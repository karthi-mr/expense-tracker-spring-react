export interface CategoryExpenseSummary {
  categoryId: number;
  categoryName: string;
  totalAmount: number;
}

export interface DailyExpenseSummary {
  date: Date;
  totalAmount: number;
}

export interface SumExpenses {
  totalExpenses: number;
  last7DaysExpense: number;
  last30DaysExpense: number;
  last365DaysExpense: number;
  dailyExpenseSummaryDtos: DailyExpenseSummary[];
  categoryExpenseSummaryDtos: CategoryExpenseSummary[];
}