package com.preflearn.expense_tracker.expense.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record DailyExpenseSummaryDto(
        LocalDateTime date,

        BigDecimal totalAmount
) {
}
