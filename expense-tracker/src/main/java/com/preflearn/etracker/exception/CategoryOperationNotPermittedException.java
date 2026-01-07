package com.preflearn.etracker.exception;

public class CategoryOperationNotPermittedException extends RuntimeException {
    private static final String MESSAGE = "You don't have access to update the category";

    public CategoryOperationNotPermittedException() {
        super(MESSAGE);
    }
}
