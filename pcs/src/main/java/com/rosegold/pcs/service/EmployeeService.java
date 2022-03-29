package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

@Service
public class EmployeeService extends BasicServiceOperations<EmployeeRepository, Employee> {

  public EmployeeService(EmployeeRepository repository) {
    super(repository);
  }

  public Set<Employee> findAllByIdsOrCategoryIds(Set<Long> ids, Set<Long> categoryIds) {
    return repository.findAllByIdInOrCategories_IdIn(ids, categoryIds);
  }

  public Set<Employee> findAllByCategoryId(Long categoryId) {
    return repository.findAllByCategories_Id(categoryId);
  }

  @Override
  public List<Employee> findAll() {
    List<Employee> employees = super.findAll();
    employees.forEach(x -> Collections.sort(x.getSchedules()));

    return employees;
  }

  public Employee save(Employee entity) {
    if (entity.getId() == null) {
      super.save(entity);
    }

    validateEntity(entity);
    Employee employee = findById(entity.getId());
    employee.setCategories(entity.getCategories());
    employee.setSchedules(entity.getSchedules());
    employee.setFirstName(entity.getFirstName());
    employee.setLastName(entity.getLastName());
    employee.setEnabled(entity.isEnabled());

    return repository.save(employee);
  }
}
