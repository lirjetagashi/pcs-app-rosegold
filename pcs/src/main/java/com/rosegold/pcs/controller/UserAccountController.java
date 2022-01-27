package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.UserAccount;
import com.rosegold.pcs.service.UserAccountService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/userAccount")
public class UserAccountController extends BasicControllerOperations<UserAccountService, UserAccount>{

  public UserAccountController(UserAccountService service) {
    super(service);
  }

}
