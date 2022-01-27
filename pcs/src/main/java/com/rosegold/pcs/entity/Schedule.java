package com.rosegold.pcs.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
import java.time.LocalTime;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Schedule extends BaseEntity  {

  @NotBlank
  private LocalTime startTime;

  @NotBlank
  private LocalTime endTime;

  @NotBlank
  private String dayOfWeek;

}
