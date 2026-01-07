package com.preflearn.etracker.category;

import com.preflearn.etracker.category.dto.CategoryRequest;
import com.preflearn.etracker.category.dto.CategoryResponse;
import com.preflearn.etracker.common.PageResponse;
import com.preflearn.etracker.exception.CategoryNotFoundException;
import com.preflearn.etracker.exception.CategoryOperationNotPermittedException;
import com.preflearn.etracker.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public PageResponse<CategoryResponse> findAllCategory(
            int page,
            int size,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Category> categories = categoryRepository.findCategoriesById(user.getId(), pageable);
        List<CategoryResponse> categoryResponses = categories.stream()
                .map(categoryMapper::toCategoryResponse)
                .toList();
        return new PageResponse<>(
                categoryResponses,
                categories.getNumber(),
                categories.getSize(),
                categories.getTotalElements(),
                categories.getTotalPages(),
                categories.isFirst(),
                categories.isLast()
        );
    }

    public CategoryResponse createCategory(CategoryRequest categoryRequest, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }
        Category category = categoryMapper.toCategory(categoryRequest, user);
        var savedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(savedCategory);
    }

    public CategoryResponse updateCategory(
            Integer categoryId,
            CategoryRequest categoryRequest,
            Authentication connectedUser
    ) {
        var category = extractUserAndCategory(categoryId, connectedUser);
        category.setCategoryName(categoryRequest.name());
        var savedCategory = categoryRepository.save(category);
        return categoryMapper.toCategoryResponse(savedCategory);
    }

    private Category extractUserAndCategory(Integer categoryId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new CategoryNotFoundException("Category not found for id: " + categoryId));
        if (!Objects.equals(category.getUser().getId(), user.getId())) {
            throw new CategoryOperationNotPermittedException();
        }
        return category;
    }

    public void deleteCategory(
            Integer categoryId,
            Authentication connectedUser
    ) {
        extractUserAndCategory(categoryId, connectedUser);
        categoryRepository.deleteById(categoryId);
    }

    public void enableOrDisableCategory(
            Integer categoryId,
            Authentication connectedUser
    ) {
        var category = extractUserAndCategory(categoryId, connectedUser);
        category.setCategoryEnabled(!category.isCategoryEnabled());
        categoryRepository.save(category);
    }
}
