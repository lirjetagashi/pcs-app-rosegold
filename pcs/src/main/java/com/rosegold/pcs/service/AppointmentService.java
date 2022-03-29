package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.Employee;
import com.rosegold.pcs.entity.StatusType;
import com.rosegold.pcs.payload.AppointmentReservation;
import com.rosegold.pcs.repository.AppointmentRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Set;
import java.util.TreeMap;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;

@Service
public class AppointmentService extends BasicServiceOperations<AppointmentRepository, Appointment> {

  private final AvailabilityService availabilityService;

  public AppointmentService(AppointmentRepository repository, @Lazy AvailabilityService availabilityService) {
    super(repository);
    this.availabilityService = availabilityService;
  }

  @Override
  public Appointment save(Appointment entity) {
    entity.getAppointmentLines().forEach(al -> {
      if (al.getEmployee().getId() == -1) {
        List<Employee> availableEmployees = availabilityService.getAvailableEmployees(entity.getDateTime().toLocalDate(), AppointmentReservation.from(entity, al), al);
        al.setEmployee(availableEmployees.get(ThreadLocalRandom.current().nextInt(0, availableEmployees.size()))); // Select random employee
      }
    });

    return super.save(entity);
  }

  public Appointment moveToProgress(Appointment appointment) {
    appointment.setStatus(StatusType.IN_PROGRESS);
    appointment.setStartDateTime(LocalDateTime.now());

    return save(appointment);
  }

  public Appointment moveToCompleted(Appointment appointment) {
    appointment.setStatus(StatusType.COMPLETED);
    appointment.setEndDateTime(LocalDateTime.now());

    return save(appointment);
  }

  public Map<LocalDate, List<Appointment>> findAllByDateBetweenAndStatus(String user, LocalDateTime from, LocalDateTime to, String status) {
    if (user == null) {
      user = "";
    }

    return repository.findByDateTimeBetweenAndStatus(user.trim().toLowerCase(), from, to, StatusType.valueOf(status))
        .stream()
        .collect(Collectors.groupingBy(x -> x.getDateTime().toLocalDate(), TreeMap::new, Collectors.toList()));
  }

  public List<Appointment> findAllAfterByEmployeeIds(LocalDateTime dateTime, Set<Long> employeeIds) {
    return repository.findByDateTimeIsAfterAndStatusAndAppointmentLines_Employee_IdIn(dateTime, StatusType.PENDING, employeeIds);
  }

}
