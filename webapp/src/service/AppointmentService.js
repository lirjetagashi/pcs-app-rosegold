import {BaseService} from "./BaseService";

export class AppointmentService extends BaseService {

    constructor() {
        super("/appointment");
    }

}