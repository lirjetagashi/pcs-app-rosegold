import {BaseService} from "./BaseService";
import {axiosInstance} from "./axiosInstance";

export class AppointmentService extends BaseService {

    constructor() {
        super("/appointment");
    }

    moveToProgress(data) {
        return axiosInstance.put(`${this.requestMapping}/in-progress`, data);
    }

    moveToCompleted(data) {
        return axiosInstance.put(`${this.requestMapping}/completed`, data);
    }

    findByDateBetweenAndStatusAndUser(status, user, from, to) {
        return axiosInstance.get(`${this.requestMapping}/all/${status}`, {
            params: {
                user: user,
                from: from,
                to: to
            }
        })
    }

}