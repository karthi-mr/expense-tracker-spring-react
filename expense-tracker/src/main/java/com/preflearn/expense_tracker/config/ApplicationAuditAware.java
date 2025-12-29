package com.preflearn.expense_tracker.config;

import com.preflearn.expense_tracker.user.User;
import lombok.NonNull;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

public class ApplicationAuditAware implements AuditorAware<Long> {

    @Override
    public @NonNull Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (
                authentication == null ||
                        !authentication.isAuthenticated() ||
                        authentication instanceof AnonymousAuthenticationToken
        ) {
            return Optional.empty();
        }

        User user = (User) authentication.getPrincipal();

        if (user == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(user.getId());
    }
}
