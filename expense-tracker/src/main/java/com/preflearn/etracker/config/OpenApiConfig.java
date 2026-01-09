package com.preflearn.etracker.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

import static io.swagger.v3.oas.annotations.enums.SecuritySchemeIn.HEADER;
import static io.swagger.v3.oas.annotations.enums.SecuritySchemeType.HTTP;

@OpenAPIDefinition(
     info = @Info(
             title = "Expense Tracker",
             description = "Expense Tracker for managing expenses",
             version = "0.0.1",
             termsOfService = "Terms of service",
             contact = @Contact(
                     name = "Karthi",
                     url = "https://www.goole.com"
             )
     ),
    servers = {
             @Server(
                     url = "http://localhost:8082/api/v1",
                     description = "Local ENV Server"
             )
    },
    security = {
        @SecurityRequirement(
                name = "Bearer Auth"
        )
    }
)
@SecurityScheme(
        name = "Bearer Auth",
        description = "JWT Auth using bearer token",
        scheme = "Bearer",
        type = HTTP,
        bearerFormat = "JWT",
        in = HEADER
)
public class OpenApiConfig {
}
