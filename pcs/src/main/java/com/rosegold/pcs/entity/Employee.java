package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Employee extends BaseEntity {

  @NotBlank
  private String firstName;

  @NotBlank
  private String lastName;

  private boolean enabled = true;

  @ManyToMany(fetch = EAGER, cascade = CascadeType.MERGE)
  @JoinTable(name = "employee_schedules",
      joinColumns = @JoinColumn(name = "employee_id"),
      inverseJoinColumns = @JoinColumn(name = "schedules_id"))
  private List<Schedule> schedules;

  @ManyToMany(fetch = EAGER, cascade = CascadeType.MERGE)
  @JoinTable(name = "employee_skills",
      joinColumns = @JoinColumn(name = "employee_id"),
      inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private Set<Skill> skills;

}
