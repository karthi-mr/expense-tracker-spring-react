package com.preflearn.etracker.expense.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;

import java.math.BigDecimal;

public record ExpenseRequestDto(

        @NotBlank(message = "Expense title should not be blank")
        String title,

        @NotBlank(message = "Expense amount should not be blank")
        BigDecimal amount,

        @NotEmpty(message = "Category id should not be empty")
        Integer categoryId
) {
}
