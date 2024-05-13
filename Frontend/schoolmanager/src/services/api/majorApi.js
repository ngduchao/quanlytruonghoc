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

const getList = () => {
    return Api.get(`${url}/get-list`);
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

const exportToCSV = (search = "", facultyName = "") => {
    const parameters = {
        search,
        facultyName,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}/export/csv`, { params: parameters });
};

const api = {
    getAllMajors,
    getList,
    createMajor,
    updateMajor,
    getById,
    deleteMajor,
    checkMajorCodeExist,
    checkMajorNameExist,
    exportToCSV,
};

export default api;
