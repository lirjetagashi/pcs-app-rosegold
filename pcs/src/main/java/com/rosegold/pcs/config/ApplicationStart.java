package com.rosegold.pcs.config;

import com.rosegold.pcs.entity.RoleType;
import com.rosegold.pcs.entity.UserAccount;
import com.rosegold.pcs.service.UserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@RequiredArgsConstructor
@Component
public class ApplicationStart {

  private final UserAccountService userService;

  @EventListener
  public void onApplicationEvent(ContextRefreshedEvent event) {

//    UserAccount user = new UserAccount();
//    user.setFirstName("Admin");
//    user.setLastName("Admin");
//    user.setEmail("admin@gmail.com");
//    user.setPassword("admin");
//    user.setDateOfBirth(LocalDate.of(1999, 8, 16));
//    user.setRole(RoleType.ADMIN);
//    userService.save(user);

  }

}