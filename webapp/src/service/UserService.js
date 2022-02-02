import {BaseService} from "./BaseService";
import {axiosInstance} from "./axiosInstance";

export class UserService extends BaseService {

    constructor() {
        super("/userAccount");
    }

    logIn(body) {
        return axiosInstance.post(`${this.requestMapping}/login`, body);
    }

}