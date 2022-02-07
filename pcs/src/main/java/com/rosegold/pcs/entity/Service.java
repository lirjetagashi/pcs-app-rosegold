package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.Set;

import static javax.persistence.FetchType.EAGER;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Service extends BaseEntity {

  @NotBlank
  private String name;

  @NotNull
  private BigDecimal price;

  @NotNull
  @Positive
  private Long durationInMinutes;

  @ManyToMany(fetch = EAGER, cascade = CascadeType.MERGE)
  @JoinTable(name = "service_skill",
      joinColumns = @JoinColumn(name = "service_id"),
      inverseJoinColumns = @JoinColumn(name = "skill_id"))
  private Set<Skill> skills;

  private boolean enabled = true;

}
