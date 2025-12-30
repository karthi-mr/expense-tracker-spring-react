package com.preflearn.expense_tracker.category;

import com.preflearn.expense_tracker.category.dto.CategoryRequestDto;
import com.preflearn.expense_tracker.category.dto.CategoryResponseDto;
import com.preflearn.expense_tracker.common.PageResponse;
import com.preflearn.expense_tracker.exception.OperationNotPermittedException;
import com.preflearn.expense_tracker.user.User;
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

    public PageResponse<CategoryResponseDto> findAllCategory(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdDate").descending());
        Page<Category> categories = this.categoryRepository.findCategoryByUserId(pageable, user.getId());
        List<CategoryResponseDto> categoryResponseDtos = categories.stream()
                .map(this.categoryMapper::categoryToCategoryResponseDto)
                .toList();
        return new PageResponse<>(
                categoryResponseDtos,
                categories.getNumber(),
                categories.getSize(),
                categories.getTotalElements(),
                categories.getTotalPages(),
                categories.isFirst(),
                categories.isLast()
        );
    }

    public CategoryResponseDto createCategory(
            CategoryRequestDto categoryRequestDto,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }

        Category category = Category.builder()
                .categoryName(categoryRequestDto.categoryName())
                .categoryEnabled(true)
                .user(user)
                .build();
        Category savedCategory = this.categoryRepository.save(category);
        return this.categoryMapper.categoryToCategoryResponseDto(savedCategory);
    }

    public CategoryResponseDto updateCategory(
            Long categoryId,
            CategoryRequestDto categoryRequestDto,
            Authentication connectedUser
    ) {
        Category category = getAndCheckCategory(categoryId, connectedUser);
        category.setCategoryName(categoryRequestDto.categoryName());
        Category updatedCategory = this.categoryRepository.save(category);
        return this.categoryMapper.categoryToCategoryResponseDto(updatedCategory);
    }

    public void deleteCategory(Long categoryId, Authentication connectedUser) {
        Category category = getAndCheckCategory(categoryId, connectedUser);
        this.categoryRepository.delete(category);
    }

    public void enableOrDisableCategory(Long categoryId, Authentication connectedUser) {
        Category category = getAndCheckCategory(categoryId, connectedUser);
        category.setCategoryEnabled(!category.isCategoryEnabled());
        this.categoryRepository.save(category);
    }

    private Category getAndCheckCategory(Long categoryId, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Category category = this.categoryRepository.findById(categoryId)
                .orElseThrow(() -> new EntityNotFoundException("Category not found"));

        if (user == null) {
            throw new EntityNotFoundException("User not found");
        }

        if (!Objects.equals(category.getUser().getId(), user.getId())) {
            throw new OperationNotPermittedException("You don't have access to update the category belongs to " +
                    "another person");
        }
        return category;
    }
}
