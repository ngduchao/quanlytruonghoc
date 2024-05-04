import Api from "./api";

const url = "/classrooms";

const getAllClassrooms = (
    page = 1,
    size = 10,
    sortField = "",
    sortType = "",
    search = "",
    majorName = ""
) => {
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        search,
        majorName,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const createClassroom = (values) => {
    const body = {
        classRoomCode: values.classRoomCode,
        classRoomName: values.classRoomName,
        course: values.course,
        majorCode: values.majorCode,
        teacherCode: values.teacherCode,
    };

    return Api.post(`${url}/create-class-room`, body);
};

const updateClassroom = (values) => {
    const body = {
        classRoomCode: values.classRoomCode,
        classRoomName: values.classRoomName,
        course: values.course,
        majorID: values.majorID,
        teacherID: values.teacherID,
        classRoomID: values.classRoomID,
    };
    return Api.put(`${url}/update-class-room/${values.classRoomID}`, body);
};

const deleteClassroom = (id) => {
    return Api.delete(`${url}/${id}`);
};

const checkClassRoomCodeExists = (classRoomCode) => {
    return Api.get(`${url}/classRoomCode/${classRoomCode}`);
};

const checkClassRoomNameExists = (classRoomName) => {
    return Api.get(`${url}/classRoomName/${classRoomName}`);
};

const CheckClassRoomNameAndCourse = (classRoomName, course) => {
    return Api.get(`${url}/classRoomNameAndCourse/${classRoomName}/${course}`);
};

const exportCSV = (classRoomID = "") => {
    const parameters = {
        classRoomID,
    };
    return Api.get(`${url}/export/csv`, { params: parameters });
};

const api = {
    getAllClassrooms,
    getById,
    createClassroom,
    updateClassroom,
    deleteClassroom,
    checkClassRoomCodeExists,
    CheckClassRoomNameAndCourse,
    checkClassRoomNameExists,
    exportCSV,
};

export default api;
