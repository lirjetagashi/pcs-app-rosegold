package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.StatusType;
import com.rosegold.pcs.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class AppointmentService extends BasicServiceOperations<AppointmentRepository, Appointment>{

  public AppointmentService(AppointmentRepository repository) {
    super(repository);
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
    return repository.findByDateTimeIsAfterAndAppointmentLines_Employee_IdIn(dateTime, employeeIds);
  }

}
