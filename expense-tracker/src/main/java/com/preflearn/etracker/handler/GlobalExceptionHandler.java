package com.preflearn.etracker.handler;

import com.preflearn.etracker.exception.CategoryNotFoundException;
import com.preflearn.etracker.exception.CategoryOperationNotPermittedException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.sql.SQLException;

import static org.springframework.http.HttpStatus.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handler(UsernameNotFoundException exception) {
        return ResponseEntity
                .status(NOT_FOUND)
                .body(
                        ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(SQLException.class)
    public ResponseEntity<ExceptionResponse> handler(SQLException exception) {
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CategoryOperationNotPermittedException.class)
    public ResponseEntity<ExceptionResponse> handler(CategoryOperationNotPermittedException exception) {
        return ResponseEntity
                .status(FORBIDDEN)
                .body(
                        ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<ExceptionResponse> handler(CategoryNotFoundException exception) {
        return ResponseEntity
                .status(NOT_FOUND)
                .body(
                        ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .build()
                );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ExceptionResponse> handler(Exception exception) {
        return ResponseEntity
                .status(INTERNAL_SERVER_ERROR)
                .body(
                        ExceptionResponse.builder()
                                .message(exception.getMessage())
                                .build()
                );
    }
}
