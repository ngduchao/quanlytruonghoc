import Api from "./api";

const url = "/faculties";

const getAllFaculties = (
    page = 1,
    size = 10,
    sortField = "",
    sortType = "",
    search = ""
) => {
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const createFaculty = (values) => {
    const body = {
        facultyCode: values.facultyCode,
        facultyName: values.facultyName,
    };

    return Api.post(`${url}/create-faculty`, body);
};

const updateFaculty = (values) => {
    const body = {
        facultyCode: values.facultyCode,
        facultyName: values.facultyName,
        facultyID: values.facultyID,
    };
    return Api.put(`${url}/update-faculty/${values.facultyID}`, body);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const deleteFaculty = (id) => {
    return Api.delete(`${url}/${id}`);
};

const api = {
    getAllFaculties,
    createFaculty,
    updateFaculty,
    getById,
    deleteFaculty,
};

export default api;
