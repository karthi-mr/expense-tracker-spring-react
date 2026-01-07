package com.preflearn.etracker.category;

import com.preflearn.etracker.category.dto.CategoryRequest;
import com.preflearn.etracker.category.dto.CategoryResponse;
import com.preflearn.etracker.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("category")
@RequiredArgsConstructor
@Tag(name = "Category", description = "Expense category")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @ResponseStatus(OK)
    public ResponseEntity<PageResponse<CategoryResponse>> findAll(
            @RequestParam(name = "page", value = "page") int page,
            @RequestParam(name = "size", value = "size") int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(categoryService.findAllCategory(page, size, connectedUser));
    }

    @PostMapping
    @ResponseStatus(CREATED)
    public ResponseEntity<CategoryResponse> createCategory(
            @RequestBody CategoryRequest categoryRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(CREATED)
                .body(categoryService.createCategory(categoryRequest, connectedUser));
    }

    @PutMapping("{category-id}")
    @ResponseStatus(OK)
    public ResponseEntity<CategoryResponse> updateCategory(
            @PathVariable("category-id") Integer categoryId,
            @RequestBody CategoryRequest categoryRequest,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(OK)
                .body(categoryService.updateCategory(categoryId, categoryRequest, connectedUser));
    }

    @DeleteMapping("{category-id}")
    @ResponseStatus(NO_CONTENT)
    public ResponseEntity<Void> deleteCategory(
            @PathVariable("category-id") Integer categoryId,
            Authentication connectedUser
    ) {
        categoryService.deleteCategory(categoryId, connectedUser);
        return ResponseEntity
                .status(NO_CONTENT)
                .build();
    }

    @PatchMapping("{category-id}")
    @ResponseStatus(NO_CONTENT)
    public ResponseEntity<Void> enableOrDisableCategory(
            @PathVariable("category-id") Integer categoryId,
            Authentication connectedUser
    ) {
        categoryService.enableOrDisableCategory(categoryId, connectedUser);
        return ResponseEntity
                .status(NO_CONTENT)
                .build();
    }
}
