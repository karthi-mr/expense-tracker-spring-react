package com.preflearn.expense_tracker.expense;

import com.preflearn.expense_tracker.category.Category;
import com.preflearn.expense_tracker.category.CategoryRepository;
import com.preflearn.expense_tracker.common.PageResponse;
import com.preflearn.expense_tracker.exception.OperationNotPermittedException;
import com.preflearn.expense_tracker.exception.UserNotFoundException;
import com.preflearn.expense_tracker.expense.dto.*;
import com.preflearn.expense_tracker.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final CategoryRepository categoryRepository;

    protected PageResponse<ExpenseResponseDto> findAllExpenses(
            int page,
            int size,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException();
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by("last_modified_date").descending());
        Page<Expense> expenses = this.expenseRepository.findExpenseByUserId(pageable, user.getId());
        List<ExpenseResponseDto> expenseResponseDtos = expenses.stream()
                .map(this.expenseMapper::expenseToExpenseResponseDto)
                .toList();
        return new PageResponse<>(
                expenseResponseDtos,
                expenses.getNumber(),
                expenses.getSize(),
                expenses.getTotalElements(),
                expenses.getTotalPages(),
                expenses.isFirst(),
                expenses.isLast()
        );
    }

    protected ExpenseResponseDto createExpense(
            ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException();
        }

        Category category = this.categoryRepository.findById(expenseRequestDto.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found for id: " +
                        expenseRequestDto.categoryId()));

        Expense expense = this.expenseMapper.expenseRequestDtoToExpense(expenseRequestDto, user, category);
        Expense savedExpense = this.expenseRepository.save(expense);
        return this.expenseMapper.expenseToExpenseResponseDto(savedExpense);
    }

    protected ExpenseResponseDto updateExpense(
            Long expenseId,
            ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException();
        }

        Category category = this.categoryRepository.findById(expenseRequestDto.categoryId())
                .orElseThrow(() -> new EntityNotFoundException("Category not found for id: " +
                        expenseRequestDto.categoryId()));

        // getting expense
        Expense expense = this.expenseRepository.findById(expenseId)
                .orElseThrow(() -> new EntityNotFoundException("Expense not found for id: " + expenseId));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("You don't have permission to updated this expense");
        }
        expense.setExpenseTitle(expenseRequestDto.ExpenseTitle());
        expense.setAmount(expenseRequestDto.amount());
        expense.setCategory(category);
        Expense savedExpense = this.expenseRepository.save(expense);
        return this.expenseMapper.expenseToExpenseResponseDto(savedExpense);
    }

    protected void deleteExpense(
            Long expenseId,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException();
        }

        // getting expense
        Expense expense = this.expenseRepository.findById(expenseId)
                .orElseThrow(() -> new EntityNotFoundException("Expense not found for id: " + expenseId));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("You don't have permission to delete this expense");
        }

        this.expenseRepository.deleteById(expenseId);
    }

    protected ExpenseResponseDto findExpenseById(
            Long expenseId,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException();
        }

        // getting expense
        Expense expense = this.expenseRepository.findById(expenseId)
                .orElseThrow(() -> new EntityNotFoundException("Expense not found for id: " + expenseId));

        if (!expense.getUser().getId().equals(user.getId())) {
            throw new OperationNotPermittedException("You don't have permission to view this expense");
        }
        return this.expenseMapper.expenseToExpenseResponseDto(expense);
    }

    protected SumExpenseDto getSumExpenses(
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UserNotFoundException();
        }

        BigDecimal totalExpenses = this.expenseRepository.getTotalExpenses(user.getId());
        BigDecimal last7DaysExpense =
                this.expenseRepository.getTotalExpensesForLastNDays(
                        LocalDateTime.now().minusDays(7),
                        user.getId()
                );
        BigDecimal last30DaysExpense =
                this.expenseRepository.getTotalExpensesForLastNDays(
                        LocalDateTime.now().minusDays(30),
                        user.getId()
                );
        BigDecimal last365DaysExpense =
                this.expenseRepository.getTotalExpensesForLastNDays(
                        LocalDateTime.now().minusDays(365),
                        user.getId()
                );
        List<CategoryExpenseSummaryDto> categoryExpenseSummaryDtos =
                this.expenseRepository.getCategoriesExpenseSum(user.getId());
        List<DailyExpenseSummaryDto> dailyExpenseSummaryDtos =
                this.expenseRepository.getDailyExpenseSum(LocalDateTime.now().minusDays(30), user.getId());

        return SumExpenseDto.builder()
                .last7DaysExpense(last7DaysExpense)
                .last30DaysExpense(last30DaysExpense)
                .last365DaysExpense(last365DaysExpense)
                .totalExpenses(totalExpenses)
                .dailyExpenseSummaryDtos(dailyExpenseSummaryDtos)
                .categoryExpenseSummaryDtos(categoryExpenseSummaryDtos)
                .build();
    }
}
