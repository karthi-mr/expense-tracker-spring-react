package com.preflearn.expense_tracker.expense.dto;

import java.math.BigDecimal;

public record ExpenseRequestDto(
    String ExpenseTitle,

    BigDecimal amount,

    Long categoryId
) {
}
