package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

  boolean existsByEmail(String email);

  UserAccount findByEmail(String email);
}
