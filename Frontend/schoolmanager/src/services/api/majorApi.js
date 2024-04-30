import Api from "./api";

const url = "/majors";

const getAllMajors = (
    page = 1,
    size = 10,
    sortField = "",
    sortType = "",
    search = "",
    facultyName = ""
) => {
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search,
        facultyName,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const createMajor = (values) => {
    const body = {
        majorCode: values.majorCode,
        majorName: values.majorName,
        facultyID: values.facultyID,
    };

    return Api.post(`${url}/create-major`, body);
};

const updateMajor = (values) => {
    const body = {
        majorCode: values.majorCode,
        majorName: values.majorName,
        facultyID: values.facultyID,
        majorID: values.majorID,
    };
    return Api.put(`${url}/update-major/${values.majorID}`, body);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const deleteMajor = (id) => {
    return Api.delete(`${url}/${id}`);
};

const checkMajorCodeExist = (majorCode) => {
    return Api.get(`${url}/majorCode/${majorCode}`);
};

const checkMajorNameExist = (majorName) => {
    return Api.get(`${url}/majorName/${majorName}`);
};

const api = {
    getAllMajors,
    createMajor,
    updateMajor,
    getById,
    deleteMajor,
    checkMajorCodeExist,
    checkMajorNameExist,
};

export default api;
