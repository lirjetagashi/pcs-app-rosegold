package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService extends BasicServiceOperations<AppointmentRepository, Appointment>{

  public AppointmentService(AppointmentRepository repository) {
    super(repository);
  }

}
