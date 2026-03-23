package com.portfolio.api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String path = request.getRequestURI();

        if (path.equals("/api/auth/login") || (path.equals("/api/users") && request.getMethod().equals("POST"))) {
            filterChain.doFilter(request, response);
            return;
        }

        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("""
                {"status":401,"message":"Token no enviado o inválido"}
            """);
            return;
        }

        String token = authHeader.substring(7);

        if (!jwtUtil.isTokenValid(token)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("""
                {"status":401,"message":"Token inválido o expirado"}
            """);
            return;
        }
        String role = jwtUtil.extractRole(token);
        String method = request.getMethod();
String pathRequest = request.getRequestURI();

// proteger solo modificaciones
if (pathRequest.startsWith("/api/projects")) {

    if (method.equals("POST") || method.equals("PUT") || method.equals("DELETE")) {

        if (!role.equals("ADMIN")) {
            response.setStatus(HttpServletResponse.SC_FORBIDDEN);
            response.setContentType("application/json");
            response.getWriter().write("""
                {"status":403,"message":"Acceso denegado - requiere rol ADMIN"}
            """);
            return;
        }
    }
}

        filterChain.doFilter(request, response);
    }
}