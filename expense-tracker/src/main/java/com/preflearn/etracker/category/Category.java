package com.preflearn.etracker.category;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.preflearn.etracker.common.BaseEntity;
import com.preflearn.etracker.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Entity
@Table(
        name = "categories",
        uniqueConstraints = @UniqueConstraint(
                name = "unique_user_categoryName",
                columnNames = {"category_name", "user_id"}
        )
)
public class Category extends BaseEntity {

    @Column(name = "category_name", nullable = false, length = 100)
    private String categoryName;

    @Column(name = "category_enabled", nullable = false)
    private boolean categoryEnabled;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;
}
