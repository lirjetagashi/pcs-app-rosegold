package com.rosegold.pcs.payload;

import lombok.Data;

@Data
public class ExceptionPayload {

  private String fieldName;

  private Object rejectedValue;

  private String message;

  private String code;

}
