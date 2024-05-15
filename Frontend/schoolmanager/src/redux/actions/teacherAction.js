import * as types from "../constants";

export function getListTeacherAction(teachers, page, totalElements) {
    return {
        type: types.GET_LIST_TEACHER,
        payload: {
            teachers,
            page,
            totalElements,
        },
    };
}

export function updateTeacherAction(teacher) {
    return {
        type: types.UPDATE_TEACHER,
        payload: teacher,
    };
}

export function deleteTeacherAction(teacher) {
    return {
        type: types.DELETE_TEACHER,
        payload: teacher,
    };
}

export function addTeacherAction(teacher) {
    return {
        type: types.ADD_TEACHER,
        payload: teacher,
    };
}
