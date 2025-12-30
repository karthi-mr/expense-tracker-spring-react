package com.preflearn.expense_tracker.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("""
            SELECT
            	category
            FROM
            	Category category
            WHERE
            	category.user.id = :userId
            """)
    Page<Category> findCategoryByUserId(Pageable pageable, Long userId);
}
