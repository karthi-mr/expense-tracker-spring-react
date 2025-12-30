package com.preflearn.expense_tracker.category;

import com.preflearn.expense_tracker.category.dto.CategoryResponseDto;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapper {

    protected CategoryResponseDto categoryToCategoryResponseDto(Category category) {
        return CategoryResponseDto.builder()
                .id(category.getId())
                .categoryName(category.getCategoryName())
                .isCategoryEnabled(category.isCategoryEnabled())
                .build();
    }
}
