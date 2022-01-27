package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Schedule;
import com.rosegold.pcs.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

@Service
public class ScheduleService extends BasicServiceOperations<ScheduleRepository, Schedule>{

  public ScheduleService(ScheduleRepository repository) {
    super(repository);
  }
}
