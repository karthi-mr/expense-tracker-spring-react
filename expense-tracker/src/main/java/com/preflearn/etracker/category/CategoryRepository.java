package com.preflearn.etracker.category;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    @Query("""
            SELECT
                category
            FROM
                Category category
            WHERE category.user.id = :userId
            """)
    Page<Category> findCategoriesById(Integer userId, Pageable pageable);

    @Query("""
            SELECT
                category
            FROM
                Category category
            WHERE category.user.id = :userId
            """)
    List<Category> findCategoriesById(Integer userId);
}
