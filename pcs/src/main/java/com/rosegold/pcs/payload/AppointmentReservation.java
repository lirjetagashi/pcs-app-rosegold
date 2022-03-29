package com.rosegold.pcs.payload;

import com.rosegold.pcs.entity.Appointment;
import com.rosegold.pcs.entity.AppointmentLine;
import com.rosegold.pcs.entity.Service;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class AppointmentReservation {

    private LocalDateTime from;

    private LocalDateTime to;

    public static AppointmentReservation from(Appointment appointment, AppointmentLine appointmentLine) {
        LocalDateTime dateTime = appointment.getDateTime();
        var reservedDuration = appointment.getAppointmentLines().stream()
                .limit(appointmentLine.getOrder() - 1)
                .map(AppointmentLine::getService)
                .mapToInt(Service::getDurationInMinutes)
                .sum();

        return new AppointmentReservation(dateTime.plusMinutes(reservedDuration), dateTime.plusMinutes(appointmentLine.getService().getDurationInMinutes()));
    }

}
