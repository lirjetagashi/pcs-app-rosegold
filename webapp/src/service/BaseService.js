import {axiosInstance} from "./axiosInstance";

export class BaseService {

    requestMapping = "";

    constructor(requestMapping) {
        this.requestMapping = requestMapping;
    }

    create(data) {
        return axiosInstance.post(this.requestMapping, data);
    }

    update(data) {
        return axiosInstance.put(this.requestMapping, data);
    }

    findAll() {
        return axiosInstance.get(`${this.requestMapping}/all`);
    }

    findById(id) {
        return axiosInstance.get(`${this.requestMapping}/${id}`);
    }

}