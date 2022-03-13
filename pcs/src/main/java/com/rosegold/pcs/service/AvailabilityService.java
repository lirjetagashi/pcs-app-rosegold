package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.AppointmentLine;
import com.rosegold.pcs.entity.BaseEntity;
import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.entity.Service;
import com.rosegold.pcs.payload.AppointmentReservation;
import com.rosegold.pcs.payload.Availability;
import com.rosegold.pcs.payload.StaffAvailability;
import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class AvailabilityService {

    private static final int MAX_RESERVATION_MONTHS = 3;
    private static final int TIME_FRAME = 15;

    private final AppointmentService appointmentService;
    private final EmployeeService employeeService;

    public Collection<Availability> getAvailableDates(List<AppointmentLine> appointmentLines) {
        Set<Long> employeeIds = appointmentLines.stream()
                .map(AppointmentLine::getEmployee)
                .map(BaseEntity::getId)
                .collect(Collectors.toSet());
        Set<Long> categoryIds = appointmentLines.stream()
                .map(AppointmentLine::getService)
                .map(Service::getCategory)
                .map(BaseEntity::getId)
                .collect(Collectors.toSet());
        List<Employee> selectedEmployees = employeeService.findAllByIdsOrCategoryIds(employeeIds, categoryIds);
        List<Appointment> appointments = appointmentService.findAllAfterByEmployeeIds(LocalDateTime.now(), selectedEmployees.stream().map(BaseEntity::getId).collect(Collectors.toSet()));

        LocalDate maxReservationDate = LocalDate.now().plusMonths(MAX_RESERVATION_MONTHS);
        Map<Long, StaffAvailability> availabilityByEmployeeId = getAvailabilityByEmployeeId(appointments, maxReservationDate);
        selectedEmployees.forEach(emp -> availabilityByEmployeeId.putIfAbsent(emp.getId(), new StaffAvailability(maxReservationDate, null, TIME_FRAME, emp)));
        Map<Long, List<Employee>> employeesByCategoryId = getEmployeesByCategoryId(categoryIds, selectedEmployees);
        Map<LocalDate, Availability> availabilityByDate = getAvailabilityByDate(appointmentLines, availabilityByEmployeeId, employeesByCategoryId);

        return availabilityByDate.values();
    }

    private Map<LocalDate, Availability> getAvailabilityByDate(List<AppointmentLine> appointmentLines, Map<Long, StaffAvailability> availabilityByEmployeeId, Map<Long, List<Employee>> employeesByCategoryId) {
        Map<LocalDate, Availability> availabilitiesByDate = new HashMap<>();
        appointmentLines.forEach(al -> {
            if (al.getEmployee().getId() == -1) {
                employeesByCategoryId.get(al.getService().getCategory().getId())
                        .stream()
                        .map(x -> availabilityByEmployeeId.get(x.getId()))
                        .flatMap(x -> x.getAvailability().stream())
                        .forEach(x -> availabilitiesByDate.merge(x.getDate(), x, Availability::merge));
                return;
            }

            availabilityByEmployeeId.get(al.getEmployee().getId())
                    .getAvailability()
                    .forEach(x -> availabilitiesByDate.merge(x.getDate(), x, Availability::merge));
        });

        return availabilitiesByDate;
    }

    private Map<Long, List<Employee>> getEmployeesByCategoryId(Set<Long> categoryIds, List<Employee> selectedEmployees) {
        return categoryIds.stream()
                .collect(
                        Collectors.toMap(x -> x, x -> selectedEmployees.stream()
                                .filter(y -> y.getCategories().stream().anyMatch(z -> Objects.equals(z.getId(), x)))
                                .collect(Collectors.toList()))
                );
    }

    private Map<Long, StaffAvailability> getAvailabilityByEmployeeId(List<Appointment> appointments, LocalDate maxReservationDate) {
        Map<Long, StaffAvailability> availabilityByEmployeeId = new HashMap<>();
        appointments.forEach(appointment -> {
            LocalDateTime appointmentDateTime = appointment.getDateTime();
            appointment.getAppointmentLines()
                    .forEach(al -> {
                        var reservedDuration = appointment.getAppointmentLines().stream()
                                .limit(al.getOrder() - 1)
                                .map(AppointmentLine::getService)
                                .mapToInt(Service::getDurationInMinutes)
                                .sum();
                        var appointmentReservation = new AppointmentReservation(appointmentDateTime.plusMinutes(reservedDuration), appointmentDateTime.plusMinutes(al.getService().getDurationInMinutes()));
                        var staffAvailability = new StaffAvailability(maxReservationDate, appointmentReservation, TIME_FRAME, al.getEmployee());

                        availabilityByEmployeeId.merge(al.getId(), staffAvailability, StaffAvailability::merge);
                    });
        });

        return availabilityByEmployeeId;
    }

}