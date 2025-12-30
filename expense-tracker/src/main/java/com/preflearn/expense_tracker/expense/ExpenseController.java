package com.preflearn.expense_tracker.expense;

import com.preflearn.expense_tracker.common.PageResponse;
import com.preflearn.expense_tracker.expense.dto.ExpenseRequestDto;
import com.preflearn.expense_tracker.expense.dto.ExpenseResponseDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("expenses")
@RequiredArgsConstructor
@Tag(name = "Expenses", description = "Expenses")
public class ExpenseController {

    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<PageResponse<ExpenseResponseDto>> findAllCategory(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(this.expenseService.findAllExpenses(page, size, connectedUser));
    }


    @GetMapping("/{expense-id}")
    public ResponseEntity<?> findCategoryById(
            @PathVariable(value = "expense-id") Long expenseId,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.expenseService.findExpenseById(expenseId, connectedUser));
    }

    @PostMapping
    public ResponseEntity<ExpenseResponseDto> createExpense(
            @RequestBody ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(this.expenseService.createExpense(expenseRequestDto, connectedUser));
    }

    @PutMapping("/{expense-id}")
    public ResponseEntity<ExpenseResponseDto> updateCategory(
            @PathVariable(value = "expense-id") Long expenseId,
            @RequestBody ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(this.expenseService.updateExpense(expenseId, expenseRequestDto, connectedUser));
    }

    @DeleteMapping("/{expense-id}")
    public ResponseEntity<?> deleteCategory(
            @PathVariable(value = "expense-id") Long expenseId,
            Authentication connectedUser
    ) {
        this.expenseService.deleteExpense(expenseId, connectedUser);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }
}
