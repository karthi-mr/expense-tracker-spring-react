package com.preflearn.expense_tracker.expense.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.util.List;

@Builder
public record SumExpenseDto(
        BigDecimal totalExpenses,

        BigDecimal last7DaysExpense,

        BigDecimal last30DaysExpense,

        BigDecimal last365DaysExpense,

        List<DailyExpenseSummaryDto> dailyExpenseSummaryDtos,

        List<CategoryExpenseSummaryDto> categoryExpenseSummaryDtos
) {
}
