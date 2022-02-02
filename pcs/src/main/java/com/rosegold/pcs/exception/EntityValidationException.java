package com.rosegold.pcs.exception;

import com.rosegold.pcs.payload.ExceptionPayload;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class EntityValidationException extends RuntimeException {

  private ExceptionPayload exceptionPayload;

}