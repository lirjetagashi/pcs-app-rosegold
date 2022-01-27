package com.rosegold.pcs.service;

import com.rosegold.pcs.entity.Booking;
import com.rosegold.pcs.repository.BookingRepository;
import org.springframework.stereotype.Service;

@Service
public class BookingService extends BasicServiceOperations<BookingRepository, Booking>{

  public BookingService(BookingRepository repository) {
    super(repository);
  }

}
