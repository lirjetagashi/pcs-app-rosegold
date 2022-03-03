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

    delete(id) {
        return axiosInstance.delete(`${this.requestMapping}/${id}`);
    }

    validateOnCreate(data) {
        return axiosInstance.post(`${this.requestMapping}/validate`, data);
    }

    validateOnUpdate(data) {
        return axiosInstance.put(`${this.requestMapping}/validate`, data);
    }

}