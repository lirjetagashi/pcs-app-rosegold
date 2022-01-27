package com.rosegold.pcs.controller;

import com.rosegold.pcs.entity.Booking;
import com.rosegold.pcs.service.BookingService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/booking")
public class BookingController extends BasicControllerOperations<BookingService, Booking> {

  public BookingController(BookingService service) {
    super(service);
  }
}
