package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Service;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServiceRepository extends JpaRepository<Service, Long> {
}
