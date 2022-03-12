package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.AppointmentLine;
import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.entity.Service;
import com.rosegold.pcs.payload.Availability;
import com.rosegold.pcs.payload.StaffAvailability;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class AvailabilityService {

  private final AppointmentService appointmentService;

  private final EmployeeService employeeService;

  private final ServiceService serviceService;

  public List<Availability> getAvailableDates(List<AppointmentLine> appointmentLines) {
    List<Appointment> appointments = appointmentService.findAllAfter(LocalDateTime.now());
    List<Service> selectedServices = serviceService.findByIds(appointmentLines.stream().map(x -> x.getService().getId()).collect(Collectors.toSet()));
    List<Employee> selectedEmployees = employeeService.findByIds(appointmentLines.stream().filter(x -> x.getId() >= 0).map(x -> x.getEmployee().getId()).collect(Collectors.toSet()));

    appointments.forEach(appointment -> {
      LocalDateTime appointmentDateTime = appointment.getDateTime();
      appointment.getAppointmentLines()
          .stream()
          .collect(Collectors.toMap(x -> x.getEmployee() == null ? -1 : x.getEmployee().getId(), x -> {
            var staffAvailability = new StaffAvailability(appointmentDateTime.toLocalDate(), 15, x.getEmployee());
            var busyDuration = appointment.getAppointmentLines().stream()
                .limit(x.getOrder() - 1)
                .map(AppointmentLine::getService)
                .mapToInt(Service::getDurationInMinutes)
                .sum();
            var busyStartTime = appointmentDateTime.toLocalTime().plusMinutes(busyDuration);
            var busyEndTime = appointmentDateTime.toLocalTime().plusMinutes(x.getService().getDurationInMinutes());

            return staffAvailability;
          }, (v1, v2) -> {
            v1.increaseNoSelectedStaffCount();
            return v1;
          }));
    });
    return null;
  }

}