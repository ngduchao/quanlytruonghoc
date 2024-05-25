import Api from "./api";

const url = "/upload";

const upload = (file, folder) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    return Api.post(`${url}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

const api = {
    upload,
};
export default api;
