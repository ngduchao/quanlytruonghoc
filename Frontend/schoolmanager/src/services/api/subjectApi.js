import Api from "./api";

const url = "/subjects";

const getAllSubjects = (
    page = 1,
    size = 10,
    sortField = "",
    sortType = "",
    search = "",
    teacherName = ""
) => {
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search,
        teacherName,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const createSubject = (values) => {
    const body = {
        subjectCode: values.subjectCode,
        subjectName: values.subjectName,
        numberOfCredit: values.numberOfCredit,
        teacherID: values.teacherID,
    };

    return Api.post(`${url}/create-subject`, body);
};

const updateSubject = (values) => {
    const body = {
        subjectCode: values.subjectCode,
        subjectName: values.subjectName,
        numberOfCredit: values.numberOfCredit,
        teacherID: values.teacherID,
        subjectID: values.subjectID,
    };
    return Api.put(`${url}/update-subject/${values.subjectID}`, body);
};

const deleteSubject = (id) => {
    return Api.delete(`${url}/${id}`);
};

const api = {
    getAllSubjects,
    getById,
    createSubject,
    updateSubject,
    deleteSubject,
};

export default api;
