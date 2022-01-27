package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
