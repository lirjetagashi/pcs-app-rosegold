package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Schedule;
import com.rosegold.pcs.service.ScheduleService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/schedule")
public class ScheduleController extends BasicControllerOperations<ScheduleService, Schedule>{

  public ScheduleController(ScheduleService service) {
    super(service);
  }
}
