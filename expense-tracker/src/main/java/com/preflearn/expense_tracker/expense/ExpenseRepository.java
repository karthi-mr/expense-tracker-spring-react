package com.preflearn.expense_tracker.expense;

import com.preflearn.expense_tracker.expense.dto.CategoryExpenseSummaryDto;
import com.preflearn.expense_tracker.expense.dto.DailyExpenseSummaryDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    @Query("""
            SELECT
                expense
            FROM
                Expense expense
            WHERE
                expense.user.id = :userId
            """)
    Page<Expense> findExpenseByUserId(Pageable pageable, Long userId);

    @Query(
            """
            SELECT
                COALESCE(SUM(expense.amount), 0)
            FROM
                Expense expense
            WHERE
                expense.user.id = :userId
            """
    )
    BigDecimal getTotalExpenses(Long userId);

    @Query(
            """
            SELECT
                COALESCE(SUM(expense.amount), 0)
            FROM
                Expense expense
            WHERE
                expense.user.id = :userId AND
                expense.createdDate >= :fromDate
            """
    )
    BigDecimal getTotalExpensesForLastNDays(@Param("fromDate") LocalDateTime fromDate, Long userId);

    @Query(
            value = """
            SELECT \s
                category.id,
                category.categoryName,
                COALESCE(SUM(expense.amount), CAST(0 AS bigdecimal))
            FROM
                Expense expense
                JOIN Category category
            WHERE
                expense.user.id = :userId
            GROUP BY
                category.id, category.categoryName
            ORDER BY
                SUM(expense.amount) DESC
            """
    )
    List<CategoryExpenseSummaryDto> getCategoriesExpenseSum(@Param("userId") Long userId);

    @Query(
            value = """
            SELECT \s
                expense.createdDate,
                COALESCE(SUM(expense.amount), CAST(0 AS bigdecimal))
            FROM
                Expense expense
            WHERE
                expense.user.id = :userId AND
                expense.createdDate >= :fromDate
            GROUP BY
                expense.createdDate
            ORDER BY
                SUM(expense.createdDate) DESC
            """
    )
    List<DailyExpenseSummaryDto> getDailyExpenseSum(
            @Param("fromDate") LocalDateTime fromDate,
            @Param("userId") Long userId
    );
}
