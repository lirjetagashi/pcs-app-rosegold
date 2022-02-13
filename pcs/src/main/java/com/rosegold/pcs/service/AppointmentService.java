package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.StatusType;
import com.rosegold.pcs.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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

  public List<Appointment> findAllByDateBetweenAndStatus(String user, LocalDateTime from, LocalDateTime to, String status) {
    if (user == null) {
      user = "";
    }

    return repository.findByDateTimeBetweenAndStatus(user.trim().toLowerCase(), from, to, StatusType.valueOf(status));
  }

}
