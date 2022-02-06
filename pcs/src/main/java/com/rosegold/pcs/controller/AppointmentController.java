package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.service.AppointmentService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/appointment")
public class AppointmentController extends BasicControllerOperations<AppointmentService, Appointment>{

  public AppointmentController(AppointmentService service) {
    super(service);
  }

}
