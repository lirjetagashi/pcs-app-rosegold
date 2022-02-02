import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/api"
});

axiosInstance.interceptors.response.use(x => Promise.resolve(x.data), x => Promise.reject(x.response?.data));