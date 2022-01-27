package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

import static javax.persistence.EnumType.STRING;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Booking extends BaseEntity {

  @NotBlank
  private LocalDateTime dateTime;

  @Enumerated(STRING)
  private StatusType status;

  @Valid
  @OneToOne
  @JoinColumn
  private Employee employee;

  @Valid
  @OneToOne
  @JoinColumn
  private Service service;

  @OneToOne
  @JoinColumn
  private UserAccount user;

}
