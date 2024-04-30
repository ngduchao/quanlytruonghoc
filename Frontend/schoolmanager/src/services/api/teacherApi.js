import Api from "./api";

const url = "/teachers";

const getAllTeachers = (
    page = 1,
    size = 10,
    sortField = "",
    sortType = "",
    search = "",
    specializeLevel = ""
) => {
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search,
        specializeLevel,
    };

    if (search) {
        parameters.search = search;
    }

    if (specializeLevel !== null || specializeLevel !== undefined) {
        parameters.specializeLevel = specializeLevel;
    }

    return Api.get(`${url}`, { params: parameters });
};

const getByID = (id) => {
    return Api.get(`${url}/${id}`);
};

const createTeacher = (values) => {
    const body = {
        teacherCode: values.teacherCode,
        teacherName: values.teacherName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthDay: values.birthDay,
        homeTown: values.homeTown,
        specializeLevel: values.specializeLevel,
    };

    return Api.post(`${url}/create-teacher`, body);
};

const updateTeacher = (values) => {
    const body = {
        teacherCode: values.teacherCode,
        teacherName: values.teacherName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthDay: values.birthDay,
        homeTown: values.homeTown,
        specializeLevel: values.specializeLevel,
        teacherID: values.teacherID,
    };

    return Api.put(`${url}/update-teacher/${values.teacherID}`, body);
};

const deleteTeacher = (id) => {
    return Api.delete(`${url}/${id}`);
};

const checkEmailExist = (email) => {
    return Api.get(`${url}/email/${email}`);
};

const checkTeacherCodeExist = (teacherCode) => {
    return Api.get(`${url}/teacherCode/${teacherCode}`);
};

const checkPhoneNumberExist = (phoneNumber) => {
    return Api.get(`${url}/phoneNumber/${phoneNumber}`);
};

const api = {
    getAllTeachers,
    createTeacher,
    deleteTeacher,
    updateTeacher,
    getByID,
    checkEmailExist,
    checkTeacherCodeExist,
    checkPhoneNumberExist,
};

export default api;
