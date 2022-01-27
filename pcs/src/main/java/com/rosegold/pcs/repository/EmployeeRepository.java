package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
