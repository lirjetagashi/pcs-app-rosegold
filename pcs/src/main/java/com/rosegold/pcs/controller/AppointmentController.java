package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.StatusType;
import com.rosegold.pcs.service.AppointmentService;
import com.rosegold.pcs.validation.group.Update;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.groups.Default;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import static org.springframework.format.annotation.DateTimeFormat.ISO.DATE_TIME;

@RestController
@RequestMapping("/appointment")
public class AppointmentController extends BasicControllerOperations<AppointmentService, Appointment>{

  public AppointmentController(AppointmentService service) {
    super(service);
  }

  @GetMapping("/all/{status}")
  public Map<LocalDate, List<Appointment>> findByDateTimeBetweenAndStatus(@PathVariable String status,
                                                                          @RequestParam(required = false) String user,
                                                                          @RequestParam @DateTimeFormat(iso = DATE_TIME) LocalDateTime from,
                                                                          @RequestParam @DateTimeFormat(iso = DATE_TIME) LocalDateTime to) {
    return service.findAllByDateBetweenAndStatus(user, from, to, status);
  }

  @PutMapping("/in-progress")
  public Appointment moveToProgress(@RequestBody @Validated({Default.class, Update.class}) Appointment appointment) {
    return service.moveToProgress(appointment);
  }

  @PutMapping("/completed")
  public Appointment moveToCompleted(@RequestBody @Validated({Default.class, Update.class}) Appointment appointment) {
    return service.moveToCompleted(appointment);
  }


}
