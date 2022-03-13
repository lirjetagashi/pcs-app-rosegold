package com.rosegold.pcs.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rosegold.pcs.validation.group.Update;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Positive;
import javax.validation.groups.ConvertGroup;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class AppointmentLine extends BaseEntity implements Comparable<AppointmentLine> {

  @NotNull
  @Positive
  @Column(name="`order`")
  private Integer order;

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

  @Override
  public int compareTo(AppointmentLine o) {
    return Integer.compare(order, o.getOrder());
  }

}
