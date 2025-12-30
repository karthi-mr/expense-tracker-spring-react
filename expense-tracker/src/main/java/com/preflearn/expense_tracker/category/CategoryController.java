package com.preflearn.expense_tracker.category;

import com.preflearn.expense_tracker.category.dto.CategoryRequestDto;
import com.preflearn.expense_tracker.category.dto.CategoryResponseDto;
import com.preflearn.expense_tracker.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("categories")
@RequiredArgsConstructor
@Tag(name = "Categories", description = "Expenses Categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<PageResponse<CategoryResponseDto>> findAllCategory(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(this.categoryService.findAllCategory(page, size, connectedUser));
    }


    @GetMapping("/{category-id}")
    public ResponseEntity<?> findCategoryById(
            @PathVariable(value = "category-id") Long categoryId,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.categoryService.findCategoryById(categoryId, connectedUser));
    }

    @PostMapping
    public ResponseEntity<CategoryResponseDto> createCategory(
            @RequestBody CategoryRequestDto categoryRequestDto,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.categoryService.createCategory(categoryRequestDto, connectedUser));
    }

    @PutMapping("/{category-id}")
    public ResponseEntity<CategoryResponseDto> updateCategory(
            @PathVariable(value = "category-id") Long categoryId,
            @RequestBody CategoryRequestDto categoryRequestDto,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.categoryService.updateCategory(categoryId, categoryRequestDto, connectedUser));
    }

    @DeleteMapping("/{category-id}")
    public ResponseEntity<?> deleteCategory(
            @PathVariable(value = "category-id") Long categoryId,
            Authentication connectedUser
    ) {
        this.categoryService.deleteCategory(categoryId, connectedUser);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }

    @GetMapping("/eod-category/{category-id}")
    public ResponseEntity<?> enableOrDisableCategory(
            @PathVariable(value = "category-id") Long categoryId,
            Authentication connectedUser
    ) {
        this.categoryService.enableOrDisableCategory(categoryId, connectedUser);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
