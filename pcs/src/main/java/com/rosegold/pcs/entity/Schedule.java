package com.rosegold.pcs.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.boot.autoconfigure.web.format.DateTimeFormatters;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.DayOfWeek;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import static javax.persistence.EnumType.STRING;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
public class Schedule extends BaseEntity implements Comparable<Schedule>  {

  @NotNull
  @JsonFormat(pattern = "HH:mm")
  private LocalTime startTime;

  @NotNull
  @JsonFormat(pattern = "HH:mm")
  private LocalTime endTime;

  @NotNull
  @Enumerated(STRING)
  private DayOfWeek dayOfWeek;

  @Override
  public int compareTo(Schedule schedule) {
    return Integer.compare(this.dayOfWeek.ordinal(), schedule.dayOfWeek.ordinal());
  }

}
