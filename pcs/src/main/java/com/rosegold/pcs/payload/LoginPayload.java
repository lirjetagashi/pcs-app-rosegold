package com.rosegold.pcs.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class LoginPayload {

  @NotBlank
  @Email
  private String email;

  @NotBlank
  private String password;

}
