import * as types from "../constants";

export function getListClassroomAction(classrooms, page, totalElements) {
    return {
        type: types.GET_LIST_CLASSROOM,
        payload: {
            classrooms,
            page,
            totalElements,
        },
    };
}

export function updateClassroomAction(classroom) {
    return {
        type: types.UPDATE_CLASSROOM,
        payload: classroom,
    };
}

export function deleteClassroomAction(classroom) {
    return {
        type: types.DELETE_CLASSROOM,
        payload: classroom,
    };
}

export function addClassroomAction(classroom) {
    return {
        type: types.ADD_CLASSROOM,
        payload: classroom,
    };
}
