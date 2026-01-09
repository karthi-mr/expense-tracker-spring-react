package com.preflearn.etracker.expense.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Builder
public record ExpenseResponseDto(

        Integer expenseId,

        String expenseTitle,

        BigDecimal amount,

        Integer categoryId,

        String categoryName,

        LocalDateTime createdAt,

        LocalDateTime lastModifiedAt
) {
}
