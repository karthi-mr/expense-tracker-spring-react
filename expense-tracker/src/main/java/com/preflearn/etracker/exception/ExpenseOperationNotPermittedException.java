package com.preflearn.etracker.exception;

public class ExpenseOperationNotPermittedException extends RuntimeException {
    private static final String MESSAGE = "You don't have access to update the expense";

    public ExpenseOperationNotPermittedException() {
        super(MESSAGE);
    }
}
