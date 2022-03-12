package com.rosegold.pcs.payload;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
public class Availability {

  private LocalDate date;

  private List<LocalTime> times;

  public Availability(LocalDate date, int timeFrame, Predicate<LocalTime> isAvailable) {
    this.date = date;
    this.times = Stream.iterate(LocalTime.MIN, time -> time.isBefore(LocalTime.MAX), time -> time.plusMinutes(timeFrame))
        .filter(isAvailable)
        .collect(Collectors.toList());
  }

}
