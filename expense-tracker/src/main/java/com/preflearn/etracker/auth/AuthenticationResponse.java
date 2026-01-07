package com.preflearn.etracker.auth;

import lombok.Builder;

@Builder
public record AuthenticationResponse(
        String token
) {
}
