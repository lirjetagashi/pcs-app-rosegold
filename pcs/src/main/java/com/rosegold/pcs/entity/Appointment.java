package com.rosegold.pcs.entity;

import com.rosegold.pcs.validation.group.Create;
import com.rosegold.pcs.validation.group.Update;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.validation.Valid;
import javax.validation.constraints.Future;
import javax.validation.constraints.NotNull;
import javax.validation.groups.ConvertGroup;
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

  @NotNull
  @Future(groups = {Create.class})
  private LocalDateTime dateTime;

  private LocalDateTime startDateTime;

  private LocalDateTime endDateTime;

  private BigDecimal total;

  @Valid
  @OneToMany(orphanRemoval = true, cascade = ALL, fetch = EAGER)
  @JoinColumn(name = "appointment_id", nullable = false)
  private List<AppointmentLine> appointmentLines;

  @Valid
  @NotNull
  @ConvertGroup.List({
      @ConvertGroup(to = Update.class),
      @ConvertGroup(from = Create.class, to = Update.class)
  })
  @OneToOne
  @JoinColumn
  private UserAccount user;

}
