package com.preflearn.etracker.auth;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record AuthenticationRequest(

        @NotBlank(message = "User email should not be empty or blank")
        String email,

        @NotBlank(message = "Password should not be empty or blank")
        String password
) {
}
