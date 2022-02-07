package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static javax.persistence.CascadeType.ALL;
import static javax.persistence.EnumType.STRING;
import static javax.persistence.FetchType.EAGER;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Appointment extends BaseEntity {

  @Enumerated(STRING)
  private StatusType status;

  @Future
  @NotNull
  private LocalDateTime dateTime;

  private LocalDateTime startDateTime;

  private LocalDateTime endDateTime;

  private BigDecimal total;

  @OneToMany(orphanRemoval = true, cascade = ALL, fetch = EAGER)
  @JoinColumn(name = "appointment_id", nullable = false)
  private List<AppointmentLine> appointmentLines;

  @NotNull
  @OneToOne
  @JoinColumn
  private UserAccount user;

}
