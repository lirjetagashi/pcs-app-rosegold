package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService extends BasicServiceOperations<EmployeeRepository, Employee> {

  public EmployeeService(EmployeeRepository repository) {
    super(repository);
  }
}
