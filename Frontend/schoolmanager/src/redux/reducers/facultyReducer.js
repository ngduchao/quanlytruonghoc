import * as types from "../constants";

const initialState = {
    faculties: [],
    page: 1,
    size: 10,
    totalElements: 0,
};

export default function facultyReducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_LIST_FACULTY: {
            return {
                ...state,
                faculties: actions.payload.faculties,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.UPDATE_FACULTY: {
            const newList = [...state.faculties];
            const index = state.faculties.findIndex(
                (faculty) => faculty.facultyID === actions.payload.facultyID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                faculties: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.DELETE_FACULTY: {
            const newList = [...state.faculties];

            const index = state.faculties.findIndex((faculty) => {
                return faculty.facultyID === actions.payload.facultyID;
            });

            newList.splice(index, 1);
            return {
                ...state,
                faculties: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.ADD_FACULTY: {
            const newList = [...state.faculties];
            newList.push(actions.payload);
            return {
                ...state,
                faculties: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        default:
            return state;
    }
}
