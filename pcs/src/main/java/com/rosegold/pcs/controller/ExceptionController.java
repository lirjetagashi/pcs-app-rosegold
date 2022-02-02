package com.rosegold.pcs.controller;

import com.rosegold.pcs.exception.EntityValidationException;
import com.rosegold.pcs.payload.ExceptionPayload;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@RestControllerAdvice
public class ExceptionController {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, ?> handleConstraintViolationException(MethodArgumentNotValidException ex) {
    return ex.getBindingResult()
        .getAllErrors()
        .stream()
        .map(x -> (FieldError) x)
        .map(this::buildValidationExceptionPayload)
        .collect(Collectors.toMap(this::buildKey, Function.identity(), ExceptionPayload::mergeValues));
  }

  private String buildKey(ExceptionPayload exceptionPayload) {
    return exceptionPayload.getFieldName().split("\\.")[0];
  }

  @ExceptionHandler(EntityNotFoundException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public ExceptionPayload handleEntityNotFoundException(EntityNotFoundException ex) {
    return ExceptionPayload.builder()
        .code("EntityNotFound")
        .message(ex.getMessage())
        .build();
  }

  @ExceptionHandler(EntityValidationException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public Map<String, ?> handleEntityNotFoundException(EntityValidationException ex) {
    return Map.of(ex.getExceptionPayload().getFieldName(), ex.getExceptionPayload());
  }

  private ExceptionPayload buildValidationExceptionPayload(FieldError fieldError) {
    ExceptionPayload exceptionPayload = new ExceptionPayload();
    exceptionPayload.setFieldName(fieldError.getField());
    exceptionPayload.setCode(fieldError.getCode());
    exceptionPayload.setMessage(fieldError.getDefaultMessage());
    exceptionPayload.setRejectedValue(fieldError.getRejectedValue());

    return exceptionPayload;
  }

}
