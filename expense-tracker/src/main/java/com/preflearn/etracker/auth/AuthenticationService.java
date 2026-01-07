package com.preflearn.etracker.auth;

import com.preflearn.etracker.security.JwtAuthService;
import com.preflearn.etracker.user.Role;
import com.preflearn.etracker.user.User;
import com.preflearn.etracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final JwtAuthService jwtAuthService;
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Authentication authentication = this.authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );
        User user = (User) authentication.getPrincipal();
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        Map<String, Object> claims = Map.of(
                "fullname", user.fullname()
        );
        final String token = this.jwtAuthService.generateToken(claims, user);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public void register(RegistrationRequest request) {
        User user = User.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(request.password())
                .role(Role.USER)
                .accountEnabled(true)
                .build();
        this.userRepository.save(user);
    }
}
