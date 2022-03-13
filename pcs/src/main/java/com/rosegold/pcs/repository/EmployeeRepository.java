package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    List<Employee> findAllByIdInOrCategories_IdIn(Set<Long> employeeIds, Set<Long> categories);

}
