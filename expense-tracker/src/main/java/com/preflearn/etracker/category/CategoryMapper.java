package com.preflearn.etracker.category;

import com.preflearn.etracker.category.dto.CategoryRequest;
import com.preflearn.etracker.category.dto.CategoryResponse;
import com.preflearn.etracker.user.User;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapper {

    public CategoryResponse toCategoryResponse(Category category) {
        return CategoryResponse.builder()
                .categoryId(category.getId())
                .categoryName(category.getCategoryName())
                .isEnabled(category.isCategoryEnabled())
                .build();
    }

    public Category toCategory(CategoryRequest categoryRequest, User user) {
        return Category.builder()
                .categoryName(categoryRequest.name())
                .categoryEnabled(true)
                .user(user)
                .build();
    }
}
