import {BaseService} from "./BaseService";

export class AppointmentLineService extends BaseService {

    constructor() {
        super("/appointment/line");
    }

}