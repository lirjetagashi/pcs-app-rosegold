export const QueryKeys = {
    USER_BY_EMAIL: (email) => "USER_" + email,
    EMPLOYEES: "EMPLOYEES",
    SERVICES: "SERVICES",
    SCHEDULES: "SCHEDULES",
    CATEGORIES: "CATEGORIES",
    APPOINTMENTS: "APPOINTMENTS",
    AVAILABILITY: (appointmentLines) => ["AVAILABILITY", appointmentLines]
}