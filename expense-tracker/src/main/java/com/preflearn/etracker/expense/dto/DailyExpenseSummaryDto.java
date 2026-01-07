package com.preflearn.etracker.expense.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record DailyExpenseSummaryDto(

        LocalDateTime date,

        BigDecimal totalAmount
) {
}
