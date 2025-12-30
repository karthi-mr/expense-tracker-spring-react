package com.preflearn.expense_tracker.expense.dto;

import java.math.BigDecimal;

public record CategoryExpenseSummaryDto(
        Long categoryId,

        String categoryName,

        BigDecimal totalAmount
) {

}
