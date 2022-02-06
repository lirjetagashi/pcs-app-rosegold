package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class EmployeeService extends BasicServiceOperations<EmployeeRepository, Employee> {

  public EmployeeService(EmployeeRepository repository) {
    super(repository);
  }

  @Override
  public List<Employee> findAll() {
    List<Employee> employees = super.findAll();
    employees.forEach(x -> Collections.sort(x.getSchedules()));

    return employees;
  }
}
