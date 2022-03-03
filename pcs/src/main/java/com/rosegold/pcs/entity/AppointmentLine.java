package com.rosegold.pcs.entity;

import com.rosegold.pcs.validation.group.Update;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class AppointmentLine extends BaseEntity {

  @Valid
  @NotNull
  @ConvertGroup(to = Update.class)
  @OneToOne
  @JoinColumn
  private Employee employee;

  @Valid
  @NotNull
  @ConvertGroup(to = Update.class)
  @OneToOne
  @JoinColumn
  private Service service;

}
