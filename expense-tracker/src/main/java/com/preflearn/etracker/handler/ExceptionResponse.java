package com.preflearn.etracker.handler;

import lombok.Builder;

@Builder
public record ExceptionResponse(
        String message
) {
}
