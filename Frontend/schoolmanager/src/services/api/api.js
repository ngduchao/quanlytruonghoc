import axios from "axios";
import Storage from "../../storage/Storages";

const axiosClient = axios.create({
    baseURL: `http://localhost:8080/api/v1`,
});

axiosClient.interceptors.request.use(async (config) => {
    // if token exists then attach token
    const token = Storage.getToken();
    if (token !== null && token !== undefined) {
        config.headers.Authorization = "Bearer " + token;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data !== undefined) {
            // only get data
            return response.data;
        }
        return response;
    },
    (error) => {
        // Handle errors
        if (error.response) {
            throw error.response;
        } else if (error.request) {
            throw error.request;
        } else {
            throw error;
        }
    }
);

export default axiosClient;
