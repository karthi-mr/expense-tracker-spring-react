package com.preflearn.expense_tracker.expense.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record ExpenseResponseDto(
    String expenseTitle,

    BigDecimal amount,

    String categoryName
) {
}
