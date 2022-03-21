package com.rosegold.pcs.payload;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.val;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.function.BiPredicate;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Data
public class Availability implements Comparable<Availability> {

  private LocalDate date;

  private boolean noAvailability;

  @JsonIgnore
  private Map<LocalTime, Boolean> availableByTime;

  public Availability(LocalDate date, int timeFrame, BiPredicate<LocalDate, LocalTime> inSchedule, BiPredicate<LocalDate, LocalTime> isAvailable) {
    this.date = date;
    val timeFramesForOneDay = 60 / timeFrame * 24;
    this.availableByTime = Stream.iterate(LocalTime.MIN, time -> time.plusMinutes(timeFrame))
        .limit(timeFramesForOneDay)
        .collect(Collectors.toMap(Function.identity(), time -> inSchedule.and(isAvailable).test(date, time)));
    if (availableByTime.values().stream().noneMatch(x -> x)) {
      this.noAvailability = true;
    }
  }

  public Map<String, List<LocalTime>> getAvailableTimesByDayPeriod() {
    return availableByTime.entrySet()
        .stream()
        .filter(Map.Entry::getValue)
        .map(Map.Entry::getKey)
        .collect(Collectors.groupingBy(this::determineDayPeriod, Collectors.collectingAndThen(Collectors.toCollection(TreeSet::new), ArrayList::new)));
  }

  public void reserveAtTime(LocalTime time) {
    this.availableByTime.computeIfPresent(time, (a, b) -> false);
    if (availableByTime.values().stream().noneMatch(x -> x)) {
      this.noAvailability = true;
    }
  }

  public Availability merge(Availability availability) {
    if (!date.equals(availability.getDate())) {
      return this;
    }

    List<LocalTime> availableTimesOfOther = availability.getAvailableByTime().entrySet()
        .stream()
        .filter(Map.Entry::getValue)
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());

    if (availableTimesOfOther.size() > 0) {
      availableTimesOfOther.forEach(time -> this.availableByTime.put(time, true));
      this.noAvailability = false;
    }

    return this;
  }

  private String determineDayPeriod(LocalTime localTime) {
    if (localTime.isBefore(LocalTime.of(12, 0))) {
      return "Morning";
    }

    if (localTime.isBefore(LocalTime.of(18, 0))) {
      return "Afternoon";
    }

    return "Evening";
  }

  @Override
  public int compareTo(Availability o) {
    return this.date.compareTo(o.getDate());
  }
}
