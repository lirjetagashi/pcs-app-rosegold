package com.rosegold.pcs.payload;

import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.entity.Schedule;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.BiPredicate;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Getter
@Setter
public class StaffAvailability {

    private Employee employee;

    private List<Availability> availability;

    public StaffAvailability(LocalDate maxAppointmentDate, AppointmentReservation appointmentReservation, int timeFrame, Employee employee) {
        List<Schedule> schedules = employee.getSchedules();
        BiPredicate<LocalDate, LocalTime> isAvailable = appointmentReservation == null ?
                (a, b) -> true :
                (date, time) -> LocalDateTime.of(date, time).isBefore(appointmentReservation.getFrom()) ||
                        LocalDateTime.of(date, time).isAfter(appointmentReservation.getTo());
        BiPredicate<LocalDate, LocalTime> inSchedule = (date, time) -> schedules.stream()
                .anyMatch(
                        schedule -> date.getDayOfWeek() == schedule.getDayOfWeek() &&
                            (time.equals(schedule.getStartTime()) || time.isAfter(schedule.getStartTime())) &&
                                time.isBefore(schedule.getEndTime())
                );
        this.availability = buildAvailability(maxAppointmentDate, timeFrame, inSchedule, isAvailable);
        this.employee = employee;
    }

    public StaffAvailability merge(StaffAvailability other) {
        Map<LocalDate, List<LocalTime>> reservedTimesByDate = other.getAvailability().stream()
                .collect(Collectors.toMap(
                        Availability::getDate,
                        x -> x.getAvailableByTime()
                                .entrySet()
                                .stream()
                                .filter(y -> !y.getValue()).map(Map.Entry::getKey)
                                .collect(Collectors.toList())
                ));
        this.availability.forEach(
                availability -> reservedTimesByDate.getOrDefault(availability.getDate(), List.of()).forEach(availability::reserveAtTime)
        );
        return this;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StaffAvailability that = (StaffAvailability) o;
        return Objects.equals(employee, that.employee);
    }

    private List<Availability> buildAvailability(LocalDate maxAppointmentDate, int timeFrame, BiPredicate<LocalDate, LocalTime> inSchedule, BiPredicate<LocalDate, LocalTime> isAvailable) {
        return Stream.iterate(LocalDate.now(), d -> d.isBefore(maxAppointmentDate), d -> d.plusDays(1))
                .map(d -> new Availability(d, timeFrame, inSchedule, isAvailable))
                .collect(Collectors.toList());
    }

}
