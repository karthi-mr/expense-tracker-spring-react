package com.preflearn.etracker.expense;

import com.preflearn.etracker.category.Category;
import com.preflearn.etracker.category.CategoryRepository;
import com.preflearn.etracker.common.PageResponse;
import com.preflearn.etracker.exception.CategoryNotFoundException;
import com.preflearn.etracker.exception.ExpenseNotFoundException;
import com.preflearn.etracker.exception.ExpenseOperationNotPermittedException;
import com.preflearn.etracker.expense.dto.*;
import com.preflearn.etracker.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final ExpenseMapper expenseMapper;
    private final CategoryRepository categoryRepository;

    public PageResponse<ExpenseResponseDto> findAll(
            int page,
            int size,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by("lastModifiedDate").descending());
        Page<Expense> expenses = expenseRepository.findExpenseByUserId(pageable, user.getId());
        List<ExpenseResponseDto> expenseResponseDtos = expenses.stream()
                .map(expenseMapper::toExpenseResponseDto)
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

    public ExpenseResponseDto createExpense(
            ExpenseRequestDto expenseRequestDto,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Category category = categoryRepository.findById(expenseRequestDto.categoryId())
                .orElseThrow(() -> new CategoryNotFoundException("Category not found for id: " +
                        expenseRequestDto.categoryId()));
        var expense = expenseMapper.toExpense(expenseRequestDto, category, user);
        var savedExpense = expenseRepository.save(expense);
        return expenseMapper.toExpenseResponseDto(savedExpense);
    }

    public ExpenseResponseDto updateExpense(
            Integer expenseId,
            ExpenseRequestDto request,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        var expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found for id: " + expenseId));
        if (!Objects.equals(expense.getUser().getId(), user.getId())) {
            throw new ExpenseOperationNotPermittedException();
        }
        if (!Objects.equals(request.categoryId(), expense.getCategory().getId())) {
            Category category = categoryRepository.findById(request.categoryId())
                    .orElseThrow(() -> new CategoryNotFoundException("Category not found for id: " +
                            request.categoryId()));
            expense.setCategory(category);
        }
        expense.setTitle(request.title());
        expense.setAmount(request.amount());
        var savedExpense = expenseRepository.save(expense);
        return expenseMapper.toExpenseResponseDto(savedExpense);
    }

    public void deleteExpense(
            Integer expenseId,
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        var expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new ExpenseNotFoundException("Expense not found for id: " + expenseId));
        if (!Objects.equals(expense.getUser().getId(), user.getId())) {
            throw new ExpenseOperationNotPermittedException();
        }
        expenseRepository.deleteById(expenseId);
    }

    public SumExpenseDto getSumExpenses(
            Authentication connectedUser
    ) {
        User user = (User) connectedUser.getPrincipal();

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
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
