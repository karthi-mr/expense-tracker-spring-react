package com.preflearn.etracker.expense.dto;

import lombok.Builder;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;

@Builder
public record DailyExpenseSummaryDto(

        LocalDate date,

        BigDecimal totalAmount
) {

    public DailyExpenseSummaryDto(Date createdDate, BigDecimal totalAmount) {
        this(createdDate.toLocalDate(), totalAmount);
    }
}
