package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.service.EmployeeService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/employee")
public class EmployeeController extends BasicControllerOperations<EmployeeService, Employee> {

  public EmployeeController(EmployeeService service) {
    super(service);
  }
}
