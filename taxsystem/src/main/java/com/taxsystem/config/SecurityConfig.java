package com.taxsystem.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.taxsystem.security.JwtAuthenticationFilter;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {

        this.jwtAuthenticationFilter = jwtAuthenticationFilter;

    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http

                .cors(Customizer.withDefaults())

                .csrf(csrf -> csrf.disable())

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                .authorizeHttpRequests(auth -> auth

                        // ===========================
                        // PUBLIC ENDPOINTS
                        // ===========================

                        .requestMatchers("/api/v1/auth/**").permitAll()

                        .requestMatchers("/api/v1/register/**").permitAll()

                        // Registration Dropdowns

                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/municipalities").permitAll()

                        .requestMatchers(HttpMethod.GET,
                                "/api/v1/business-types").permitAll()

                        // ===========================
                        // ADMIN ONLY
                        // ===========================

                        .requestMatchers("/api/v1/dashboard/**").hasRole("ADMIN")

                        .requestMatchers("/api/v1/users/**").hasRole("ADMIN")

                        // Municipalities

                        .requestMatchers(HttpMethod.POST,
                                "/api/v1/municipalities/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.PUT,
                                "/api/v1/municipalities/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/v1/municipalities/**").hasRole("ADMIN")

                        // Business Types

                        .requestMatchers(HttpMethod.POST,
                                "/api/v1/business-types/**").authenticated()

                        .requestMatchers(HttpMethod.PUT,
                                "/api/v1/business-types/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.DELETE,
                                "/api/v1/business-types/**").hasRole("ADMIN")

                        // ===========================
                        // AUTHENTICATED USERS
                        // ===========================

                        // .requestMatchers("/api/v1/businesses/**").authenticated()

                        .requestMatchers("/api/v1/users/**").authenticated()

                        .requestMatchers("/api/v1/monthly-taxes/**").authenticated()

                        .requestMatchers("/api/v1/payments/**").authenticated()

                        .anyRequest().authenticated())

                .httpBasic(Customizer.withDefaults())

                .addFilterBefore(

                        jwtAuthenticationFilter,

                        UsernamePasswordAuthenticationFilter.class);

        return http.build();

    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(

                List.of("http://localhost:5173"));

        configuration.setAllowedMethods(

                List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setAllowedHeaders(

                List.of("*"));

        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration("/**", configuration);

        return source;

    }

}