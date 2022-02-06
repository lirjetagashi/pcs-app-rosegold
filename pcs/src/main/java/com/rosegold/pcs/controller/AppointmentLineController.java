package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.AppointmentLine;
import com.rosegold.pcs.service.AppointmentLineService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/appointment/line")
public class AppointmentLineController extends BasicControllerOperations<AppointmentLineService, AppointmentLine> {

  public AppointmentLineController(AppointmentLineService service) {
    super(service);
  }
}
