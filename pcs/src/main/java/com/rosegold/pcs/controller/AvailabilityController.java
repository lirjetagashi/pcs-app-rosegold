package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.AppointmentLine;
import com.rosegold.pcs.payload.Availability;
import com.rosegold.pcs.service.AvailabilityService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.constraints.NotEmpty;
import java.util.Collection;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/availability")
public class AvailabilityController {

  private final AvailabilityService availabilityService;

  @GetMapping
  public Collection<Availability> getAvailability(@RequestBody @NotEmpty List<AppointmentLine> appointmentLines) {
    return availabilityService.getAvailableDates(appointmentLines);
  }

}
