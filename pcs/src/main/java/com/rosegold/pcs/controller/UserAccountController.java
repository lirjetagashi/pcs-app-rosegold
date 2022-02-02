package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.UserAccount;
import com.rosegold.pcs.payload.LoginPayload;
import com.rosegold.pcs.service.UserAccountService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/userAccount")
public class UserAccountController extends BasicControllerOperations<UserAccountService, UserAccount> {

  public UserAccountController(UserAccountService service) {
    super(service);
  }

  @PostMapping("/login")
  public UserAccount login(@RequestBody @Valid LoginPayload loginPayload) {
    return service.login(loginPayload);
  }

}
