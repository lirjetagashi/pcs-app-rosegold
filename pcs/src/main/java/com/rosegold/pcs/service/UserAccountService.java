package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.RoleType;
import com.rosegold.pcs.entity.UserAccount;
import com.rosegold.pcs.exception.EntityValidationException;
import com.rosegold.pcs.payload.ExceptionPayload;
import com.rosegold.pcs.payload.LoginPayload;
import com.rosegold.pcs.repository.UserAccountRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class UserAccountService extends BasicServiceOperations<UserAccountRepository, UserAccount> {

  private final PasswordEncoder passwordEncoder;

  public UserAccountService(UserAccountRepository repository,
                            PasswordEncoder passwordEncoder) {
    super(repository);
    this.passwordEncoder = passwordEncoder;
  }

  @Override
  public UserAccount save(UserAccount entity) {
    if (entity.getId() == null) {
      entity.setPassword(passwordEncoder.encode(entity.getPassword()));
      entity.setRole(RoleType.MEMBER);
    } else {
      UserAccount user = repository.findById(entity.getId())
          .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
      entity.setPassword(user.getPassword());
    }

    return super.save(entity);
  }

  @Override
  protected void validateEntity(UserAccount entity) throws EntityValidationException {
    if (repository.existsByEmail(entity.getEmail())) {
      throw new EntityValidationException(ExceptionPayload.builder()
          .code("DuplicateEmail")
          .fieldName("email")
          .rejectedValue(entity.getEmail())
          .message("This email already exists")
          .build()
      );
    }
  }

  public UserAccount login(LoginPayload loginPayload) {
    UserAccount user = repository.findByEmail(loginPayload.getEmail());

    if(user == null){
      throw new EntityValidationException(ExceptionPayload.builder()
          .code("EmailNotFound")
          .fieldName("email")
          .rejectedValue(loginPayload.getEmail())
          .message("This user does not have an account")
          .build());
    }

    if(!passwordEncoder.matches(loginPayload.getPassword(), user.getPassword())){
      throw new EntityValidationException(ExceptionPayload.builder()
          .code("PasswordNotCorrect")
          .fieldName("password")
          .rejectedValue(loginPayload.getPassword())
          .message("Not correct")
          .build());
    }

    return user;
  }
}
