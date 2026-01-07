package com.preflearn.etracker.auth;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(
        name = "Authentication",
        description = "User authentication and user registration"
)
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody @Valid AuthenticationRequest authenticationRequest
    ) {
        return ResponseEntity.ok(this.authenticationService.authenticate(authenticationRequest));
    }

    @PostMapping("register")
    public ResponseEntity<Void> register(
            @RequestBody @Valid RegistrationRequest registrationRequest
    ) {
        this.authenticationService.register(registrationRequest);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .build();
    }
}
