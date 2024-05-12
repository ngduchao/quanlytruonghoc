import * as types from "../constants";

export function getListMajorAction(majors, page, totalElements) {
    return {
        type: types.GET_LIST_MAJOR,
        payload: {
            majors,
            page,
            totalElements,
        },
    };
}

export function updateMajorAction(major) {
    return {
        type: types.UPDATE_MAJOR,
        payload: major,
    };
}

export function deleteMajorAction(major) {
    return {
        type: types.DELETE_MAJOR,
        payload: major,
    };
}

export function addMajorAction(major) {
    return {
        type: types.ADD_MAJOR,
        payload: major,
    };
}
