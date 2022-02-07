package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.Valid;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class AppointmentLine extends BaseEntity {

  @Valid
  @OneToOne
  @JoinColumn
  private Employee employee;

  @Valid
  @OneToOne
  @JoinColumn
  private Service service;

}
