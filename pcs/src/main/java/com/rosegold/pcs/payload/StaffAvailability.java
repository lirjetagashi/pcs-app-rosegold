package com.rosegold.pcs.payload;

import com.rosegold.pcs.entity.Employee;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Objects;
import java.util.function.Predicate;

@Getter
@Setter
public class StaffAvailability {

  private Employee employee;

  private boolean noSelectedStaff;

  private int noSelectedStaffCount;

  private Availability availability;

  public StaffAvailability(LocalDate date, int timeFrame, Employee employee) {
    if (employee == null) {
      this.availability = new Availability(date, timeFrame, time -> true);
      this.noSelectedStaff = true;
      this.noSelectedStaffCount = 1;
      return;
    }

    var schedules = employee.getSchedules();
    Predicate<LocalTime> isAvailable = time -> schedules.stream()
        .anyMatch(schedule ->
            date.getDayOfWeek() == schedule.getDayOfWeek() &&
                time.isBefore(schedule.getStartTime()) &&
                time.isAfter(schedule.getEndTime())
        );
    this.availability = new Availability(date, timeFrame, isAvailable);
    this.employee = employee;
  }

  public void increaseNoSelectedStaffCount() {
    this.noSelectedStaffCount++;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    StaffAvailability that = (StaffAvailability) o;
    return Objects.equals(employee, that.employee);
  }

}
