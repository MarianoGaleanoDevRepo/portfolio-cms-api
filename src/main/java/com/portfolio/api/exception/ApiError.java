package com.portfolio.api.exception;

public record ApiError(
        int status,
        String message
) {
}

