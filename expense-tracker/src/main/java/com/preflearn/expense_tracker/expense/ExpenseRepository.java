package com.preflearn.expense_tracker.expense;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

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
}
