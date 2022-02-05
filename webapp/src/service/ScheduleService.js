import {BaseService} from "./BaseService";

export class ScheduleService extends BaseService {

    constructor() {
        super("/schedule");
    }

    create(data) {
        const newData = {...data, startTime: this.getTime(data?.startTime), endTime: this.getTime(data?.endTime)}
        return super.create(newData);
    }

    update(data) {
        const newData = {...data, startTime: this.getTime(data?.startTime), endTime: this.getTime(data?.endTime)}
        return super.update(newData);
    }

    getTime(value) {
        if (!value) {
            return value;
        }

        return (typeof value === "string" ? new Date("01/01/1970 " + value) : value).toLocaleTimeString().substring(0, 5);
    }
}