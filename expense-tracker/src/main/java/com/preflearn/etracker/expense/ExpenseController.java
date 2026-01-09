package com.preflearn.etracker.expense;

import com.preflearn.etracker.common.PageResponse;
import com.preflearn.etracker.expense.dto.ExpenseRequestDto;
import com.preflearn.etracker.expense.dto.ExpenseResponseDto;
import com.preflearn.etracker.expense.dto.SumExpenseDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.HttpStatus.*;

@RestController
@RequestMapping("expense")
@RequiredArgsConstructor
@Tag(name = "Expenses", description = "Expense calculations")
public class ExpenseController {
    private final ExpenseService expenseService;

    @GetMapping
    public ResponseEntity<PageResponse<ExpenseResponseDto>> findAllExpense(
            @RequestParam(name = "page", defaultValue = "0", required = false) int page,
            @RequestParam(name = "size", defaultValue = "10", required = false) int size,
            Authentication connectedUser
    ) {
        return ResponseEntity.ok(this.expenseService.findAll(page, size, connectedUser));
    }

    @PostMapping
    public ResponseEntity<ExpenseResponseDto> createExpense(
            @RequestBody ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(CREATED)
                .body(this.expenseService.createExpense(expenseRequestDto, connectedUser));
    }

    @GetMapping("/{expense-id}")
    public ResponseEntity<ExpenseResponseDto> getExpenseById(
            @PathVariable(value = "expense-id") Integer expenseId,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(OK)
                .body(this.expenseService.getExpenseById(expenseId, connectedUser));
    }

    @PutMapping("/{expense-id}")
    public ResponseEntity<ExpenseResponseDto> updateExpense(
            @PathVariable(value = "expense-id") Integer expenseId,
            @RequestBody ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(OK)
                .body(this.expenseService.updateExpense(expenseId, expenseRequestDto, connectedUser));
    }

    @DeleteMapping("/{expense-id}")
    public ResponseEntity<?> deleteExpense(
            @PathVariable(value = "expense-id") Integer expenseId,
            Authentication connectedUser
    ) {
        this.expenseService.deleteExpense(expenseId, connectedUser);
        return ResponseEntity
                .status(NO_CONTENT)
                .build();
    }

    @GetMapping("/getSumExpenses")
    public ResponseEntity<SumExpenseDto> getSumExpenses(
            Authentication connectedUser
    ) {
        return ResponseEntity
                .status(OK)
                .body(this.expenseService.getSumExpenses(connectedUser));
    }
}
