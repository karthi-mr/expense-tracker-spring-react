package com.preflearn.expense_tracker.category.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;


public record CategoryRequestDto(
        @NotBlank(message = "Category name should not be empty")
        @NotEmpty(message = "Category name should not be empty")
        String categoryName
) {
}
