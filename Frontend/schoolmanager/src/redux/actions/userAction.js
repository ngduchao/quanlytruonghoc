import * as types from "../constants";

export function getListUserAction(users, page, totalElements) {
    return {
        type: types.GET_LIST_USER,
        payload: {
            users,
            page,
            totalElements,
        },
    };
}

export function updateUserAction(user) {
    return {
        type: types.UPDATE_USER,
        payload: user,
    };
}

export function deleteUserAction(user) {
    return {
        type: types.DELETE_USER,
        payload: user,
    };
}

export function addUserAction(user) {
    return {
        type: types.ADD_USER,
        payload: user,
    };
}
