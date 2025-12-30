package com.preflearn.expense_tracker.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.preflearn.expense_tracker.common.BaseEntity;
import com.preflearn.expense_tracker.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(
                name = "unique_user_categoryName",
                columnNames = {"category_name", "user_id"})
)
public class Category extends BaseEntity {

    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;

    @Column(nullable = false)
    private boolean categoryEnabled;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
}
