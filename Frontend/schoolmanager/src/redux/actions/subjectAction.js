import * as types from "../constants";

export function getListSubjectAction(subjects, page, totalElements) {
    return {
        type: types.GET_LIST_SUBJECT,
        payload: {
            subjects,
            page,
            totalElements,
        },
    };
}

export function getListSubjectNotPageAction(subjects) {
    return {
        type: types.GET_LIST_SUBJECT_NOT_PAGINATION,
        payload: subjects,
    };
}

export function updateSubjectAction(subject) {
    return {
        type: types.UPDATE_SUBJECT,
        payload: subject,
    };
}

export function deleteSubjectAction(subject) {
    return {
        type: types.DELETE_SUBJECT,
        payload: subject,
    };
}

export function addSubjectAction(subject) {
    return {
        type: types.ADD_SUBJECT,
        payload: subject,
    };
}
