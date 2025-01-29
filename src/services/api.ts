import * as axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

const api = axios.create ({
    baseURL: "//localhost:3000",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config
    },
    (error) => Promise.reject(error)
);

export default api