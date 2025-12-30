package com.preflearn.expense_tracker.auth;

import lombok.Builder;

@Builder
public record AuthenticationResponse(
        String token
) {
}