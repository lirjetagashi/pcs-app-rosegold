package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.AppointmentLine;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AppointmentLineRepository extends JpaRepository<AppointmentLine, Long> {
}
