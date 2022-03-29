package com.rosegold.pcs.repository;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.StatusType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

  @Query(
      "SELECT a FROM Appointment a " +
          "LEFT JOIN a.user u " +
          "WHERE (?1 = '' OR LOWER(u.firstName) LIKE %?1% OR LOWER(u.lastName) LIKE %?1%) " +
          "AND a.dateTime BETWEEN ?2 AND ?3 " +
          "AND a.status = ?4 " +
          "ORDER BY a.dateTime"
  )
  List<Appointment> findByDateTimeBetweenAndStatus(String user, LocalDateTime from, LocalDateTime to, StatusType statusType);

  List<Appointment> findByDateTimeIsAfterAndStatusAndAppointmentLines_Employee_IdIn(LocalDateTime dateTime, StatusType statusType, Set<Long> employeeIds);

}
