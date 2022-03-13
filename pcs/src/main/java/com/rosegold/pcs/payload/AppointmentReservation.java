package com.rosegold.pcs.payload;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AppointmentReservation {

    private LocalDateTime from;

    private LocalDateTime to;

}
