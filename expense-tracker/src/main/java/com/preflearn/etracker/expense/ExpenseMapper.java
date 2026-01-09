package com.preflearn.etracker.expense;

import com.preflearn.etracker.category.Category;
import com.preflearn.etracker.expense.dto.ExpenseRequestDto;
import com.preflearn.etracker.expense.dto.ExpenseResponseDto;
import com.preflearn.etracker.user.User;
import org.springframework.stereotype.Service;

@Service
public class ExpenseMapper {

    public ExpenseResponseDto toExpenseResponseDto(Expense expense) {
        return ExpenseResponseDto.builder()
                .expenseId(expense.getId())
                .expenseTitle(expense.getTitle())
                .amount(expense.getAmount())
                .categoryId(expense.getCategory().getId())
                .categoryName(expense.getCategory().getCategoryName())
                .createdAt(expense.getCreatedDate())
                .lastModifiedAt(expense.getLastModifiedDate())
                .build();
    }

    public Expense toExpense(
            ExpenseRequestDto requestDto,
            Category category,
            User user
    ) {
        return Expense.builder()
                .title(requestDto.title())
                .amount(requestDto.amount())
                .category(category)
                .user(user)
                .build();
    }
}
