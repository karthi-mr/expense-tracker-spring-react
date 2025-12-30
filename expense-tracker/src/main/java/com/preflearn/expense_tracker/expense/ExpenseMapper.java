package com.preflearn.expense_tracker.expense;

import com.preflearn.expense_tracker.category.Category;
import com.preflearn.expense_tracker.expense.dto.ExpenseRequestDto;
import com.preflearn.expense_tracker.expense.dto.ExpenseResponseDto;
import com.preflearn.expense_tracker.user.User;
import org.springframework.stereotype.Service;

@Service
public class ExpenseMapper {

    protected ExpenseResponseDto expenseToExpenseResponseDto(Expense expense) {
        return ExpenseResponseDto.builder()
                .expenseTitle(expense.getExpenseTitle())
                .amount(expense.getAmount())
                .categoryName(expense.getCategory().getCategoryName())
                .build();
    }

    protected Expense expenseRequestDtoToExpense(ExpenseRequestDto expenseRequestDto, User user, Category category) {
        return Expense.builder()
                .expenseTitle(expenseRequestDto.ExpenseTitle())
                .amount(expenseRequestDto.amount())
                .category(category)
                .user(user)
                .build();
    }
}
