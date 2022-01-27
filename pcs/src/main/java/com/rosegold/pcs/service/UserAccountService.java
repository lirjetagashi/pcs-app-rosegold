package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.UserAccount;
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
    }

    UserAccount user = repository.findById(entity.getId())
        .orElseThrow(() -> new EntityNotFoundException("No entity found with id: " + entity.getId()));
    entity.setPassword(user.getPassword());

    return super.save(entity);
  }
}
