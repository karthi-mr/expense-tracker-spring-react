package com.preflearn.etracker.category.dto;

import lombok.Builder;

@Builder
public record CategoryResponse(
        Integer categoryId,

        String categoryName,

        boolean isEnabled
) {
}
