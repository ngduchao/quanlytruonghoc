import * as types from "../constants";

const initialState = {
    teachers: [],
    page: 1,
    size: 10,
    totalElements: 0,
};

export default function teacherReducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_LIST_TEACHER: {
            return {
                ...state,
                teachers: actions.payload.teachers,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.UPDATE_TEACHER: {
            const newList = [...state.teachers];
            const index = state.teachers.findIndex(
                (teacher) => teacher.teacherID === actions.payload.teacherID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                teachers: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.DELETE_TEACHER: {
            const newList = [...state.teachers];
            const index = state.teachers.findIndex(
                (teacher) => teacher.teacherID === actions.payload.teacherID
            );

            newList.splice(index, 1);
            return {
                ...state,
                teachers: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.ADD_TEACHER: {
            const newList = [...state.teachers];
            newList.push(actions.payload);
            return {
                ...state,
                teachers: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        default:
            return state;
    }
}
