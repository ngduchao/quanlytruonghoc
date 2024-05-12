import Api from "./api";
import Storage from "../../storage/Storages";

const login = (username, password) => {
    Storage.setToken(null);

    const body = {
        username: username,
        password: password,
    };

    return Api.post(`/auth/login`, body);
};

const api = { login };
export default api;
