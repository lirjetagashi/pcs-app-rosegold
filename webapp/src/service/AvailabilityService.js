import {axiosInstance} from "./axiosInstance";

export class AvailabilityService {

    requestMapping = "";

    constructor() {
        this.requestMapping = "/availability"
    }

    getAvailability(appointmentLines) {
        return axiosInstance.post(this.requestMapping, appointmentLines);
    }

}