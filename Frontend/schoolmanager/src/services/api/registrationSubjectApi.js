import Api from "./api";

const url = "/registration-subjects";

const getAllRegistrationSubjects = (subjectID = "") => {
    const parameters = {
        subjectID,
    };

    return Api.get(`${url}/get-by-subject`, { params: parameters });
};

const getAll = () => {
    return Api.get(`${url}`);
};

const getListRegistrationSubjectsByUser = () => {
    return Api.get(`${url}/get-registration-subject-by-username`);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const createRegistrationSubject = (values) => {
    const body = {
        // registrationSubjectID: values.registrationSubjectID,
        subjectID: values.subjectID,
        userCode: values.userCode,
    };

    return Api.post(`${url}/create-registration-subject`, body);
};

const updateRegistrationSubject = (values) => {
    const body = {
        regularPoint1: values.regularPoint1,
        regularPoint2: values.regularPoint2,
        midtermScore: values.midtermScore,
        finalScore: values.finalScore,
        registrationSubjectID: values.registrationSubjectID,
    };
    return Api.put(
        `${url}/update-score-for-student/${values.registrationSubjectID}`,
        body
    );
};

const deleteRegistrationSubject = (id) => {
    return Api.delete(`${url}/${id}`);
};

const checkRegistrationSubjectExistsByUserIDAndSubjectID = (
    userCode = "",
    subjectID = ""
) => {
    const parameters = {
        userCode,
        subjectID,
    };

    return Api.get(
        `${url}/registration-subject-exists-by-userID-and-subjectID`,
        { params: parameters }
    );
};

const exportCSV = (subjectID = "") => {
    const parameters = {
        subjectID,
    };
    return Api.get(`${url}/export/csv`, { params: parameters });
};

const api = {
    getAll,
    getAllRegistrationSubjects,
    getById,
    createRegistrationSubject,
    updateRegistrationSubject,
    deleteRegistrationSubject,
    checkRegistrationSubjectExistsByUserIDAndSubjectID,
    getListRegistrationSubjectsByUser,
    exportCSV,
};

export default api;
