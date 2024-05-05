import * as types from "../constants";

export function getListFacultyAction(faculties, page, totalElements) {
    return {
        type: types.GET_LIST_FACULTY,
        payload: {
            faculties,
            page,
            totalElements,
        },
    };
}

export function updateFacultyAction(faculty) {
    return {
        type: types.UPDATE_FACULTY,
        payload: faculty,
    };
}

export function deleteFacultyAction(faculty) {
    return {
        type: types.DELETE_FACULTY,
        payload: faculty,
    };
}

export function addFacultyAction(faculty) {
    return {
        type: types.ADD_FACULTY,
        payload: faculty,
    };
}
