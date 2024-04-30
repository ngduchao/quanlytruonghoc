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

const getListSubjects = () => {
    return Api.get(`${url}/get-list-subject`);
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

const checkSubjectCodeExist = (subjectCode) => {
    return Api.get(`${url}/subjectCode/${subjectCode}`);
};

const checkSubjectNameExist = (subjectName) => {
    return Api.get(`${url}/subjectName/${subjectName}`);
};

const checkSubjectCodeAndSubjectNameExist = (subjectCode, subjectName) => {
    return Api.get(
        `${url}/subjectCodeAndSubjectName/${subjectCode}/${subjectName}`
    );
};

const api = {
    getAllSubjects,
    getListSubjects,
    getById,
    createSubject,
    updateSubject,
    deleteSubject,
    checkSubjectCodeExist,
    checkSubjectNameExist,
    checkSubjectCodeAndSubjectNameExist,
};

export default api;
