package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Schedule;
import com.rosegold.pcs.repository.ScheduleRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ScheduleService extends BasicServiceOperations<ScheduleRepository, Schedule>{

  public ScheduleService(ScheduleRepository repository) {
    super(repository);
  }

  @Override
  public List<Schedule> findAll() {
    List<Schedule> schedules = super.findAll();
    Collections.sort(schedules);

    return schedules;
  }
}
