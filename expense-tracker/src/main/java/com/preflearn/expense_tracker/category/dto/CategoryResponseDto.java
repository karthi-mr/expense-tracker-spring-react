package com.preflearn.expense_tracker.category.dto;

import lombok.Builder;

@Builder
public record CategoryResponseDto(
        long id,

        String categoryName,

        boolean isCategoryEnabled
) {
}
