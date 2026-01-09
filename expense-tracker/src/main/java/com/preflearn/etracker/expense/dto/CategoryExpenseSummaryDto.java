package com.preflearn.etracker.expense.dto;

import lombok.Builder;

import java.math.BigDecimal;

@Builder
public record CategoryExpenseSummaryDto(

        Integer categoryId,

        String categoryName,

        BigDecimal totalAmount
) {
}
