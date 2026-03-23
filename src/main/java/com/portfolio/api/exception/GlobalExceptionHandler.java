package com.portfolio.api.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // Maneja errores de negocio (los tuyos)
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ApiError handleRuntimeException(RuntimeException ex) {
        return new ApiError(
                400,
                ex.getMessage()
        );
    }

    // Maneja errores inesperados (fallback)
    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ApiError handleGeneric(Exception ex) {
        return new ApiError(
                500,
                "Error interno del servidor"
        );
    }
}