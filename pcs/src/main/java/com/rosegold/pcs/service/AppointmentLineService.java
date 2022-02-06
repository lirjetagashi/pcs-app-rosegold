package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.AppointmentLine;
import com.rosegold.pcs.repository.AppointmentLineRepository;
import org.springframework.stereotype.Service;

@Service
public class AppointmentLineService extends BasicServiceOperations<AppointmentLineRepository, AppointmentLine>{

  public AppointmentLineService(AppointmentLineRepository repository) {
    super(repository);
  }

}
