import Api from "./api";

const url = "/users";

const getAllUsers = (
    page = 1,
    size = 10,
    sortField = "",
    sortType = "",
    role = "",
    search = "",
    classRoomName = ""
) => {
    const parameters = {
        page,
        size,
        sort: `${sortField},${sortType}`,
        role,
        search,
        classRoomName,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const getProfile = () => {
    return Api.get(`${url}/profile`);
};

const getById = (id) => {
    return Api.get(`${url}/${id}`);
};

const updateUser = (values) => {
    const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthDay: values.birthDay,
        homeTown: values.homeTown,
        gender: values.gender,
        classRoomID: values.classRoomID,
        userID: values.userID,
    };
    return Api.put(`${url}/update-user/${values.userID}`, body);
};

const updateAdmin = (values) => {
    const body = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        birthDay: values.birthDay,
        homeTown: values.homeTown,
        gender: values.gender,
        userID: values.userID,
    };
    return Api.put(`${url}/update-admin/${values.userID}`, body);
};

const deleteUser = (id) => {
    return Api.delete(`${url}/${id}`);
};

const createUser = (values) => {
    const body = {
        userCode: values.userCode,
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        birthDay: values.birthDay,
        homeTown: values.homeTown,
        gender: values.gender,
        role: values.role,
        classRoomID: values.classRoomID,
        status: values.status,
    };

    return Api.post(`${url}/create-user`, body);
};

const createAdmin = (values) => {
    const body = {
        userCode: values.userCode,
        username: values.username,
        email: values.email,
        password: values.password,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        birthDay: values.birthDay,
        homeTown: values.homeTown,
        gender: values.gender,
        role: values.role,
        status: values.status,
    };

    return Api.post(`${url}/create-admin`, body);
};

const changePassword = (values) => {
    const body = {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
    };

    return Api.put(`${url}/changePassword`, body);
};

const resetPassword = (email) => {
    return Api.get(`${url}/resetPasswordRequest`, { params: email });
};

const checkEmailExist = (email) => {
    return Api.get(`${url}/email/${email}`);
};

const checkUserCodeExist = (userCode) => {
    return Api.get(`${url}/userCode/${userCode}`);
};

const checkUsernameExist = (username) => {
    return Api.get(`${url}/username/${username}`);
};

const checkPhoneNumberExist = (phoneNumber) => {
    return Api.get(`${url}/phoneNumber/${phoneNumber}`);
};

const getAllAdmins = (role = "ADMIN", search = "") => {
    const parameters = { role, search };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}`, { params: parameters });
};

const getUserByUserCode = (userCode) => {
    const parameters = { userCode };

    return Api.get(`${url}/get-user-by-userCode`, { params: parameters });
};

const getUserByUsername = (username) => {
    const parameters = {
        username,
    };
    return Api.get(`${url}/get-user-by-username`, { params: parameters });
};

const exportToCSV = (role = "", search = "", classRoomName = "") => {
    const parameters = {
        role,
        search,
        classRoomName,
    };

    if (search) {
        parameters.search = search;
    }

    return Api.get(`${url}/export/csv`, { params: parameters });
};

const api = {
    getAllUsers,
    getById,
    updateUser,
    deleteUser,
    createUser,
    getProfile,
    changePassword,
    resetPassword,
    getAllAdmins,
    updateAdmin,
    createAdmin,
    checkEmailExist,
    checkUserCodeExist,
    checkUsernameExist,
    checkPhoneNumberExist,
    getUserByUserCode,
    getUserByUsername,
    exportToCSV,
};

export default api;
