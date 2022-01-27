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

  @OneToMany(fetch = EAGER, cascade = CascadeType.ALL)
  private Set<Schedule> schedules;

  @ManyToMany(fetch = EAGER, cascade = CascadeType.ALL)
  @JoinTable(name = "employee_skill",
      joinColumns = @JoinColumn(name = "employee_id"),
      inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private Set<Skill> skills;

}
