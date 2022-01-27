package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}
