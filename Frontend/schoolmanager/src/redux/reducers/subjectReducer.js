import * as types from "../constants";

const initialState = {
    subjects: [],
    page: 1,
    size: 10,
    totalElements: 0,
};

export default function subjectReducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_LIST_SUBJECT: {
            return {
                ...state,
                subjects: actions.payload.subjects,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.UPDATE_SUBJECT: {
            const newList = [...state.subjects];
            const index = state.subjects.findIndex(
                (subject) => subject.subjectID === actions.payload.subjectID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                subjects: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.DELETE_SUBJECT: {
            const newList = [...state.subjects];
            const index = state.subjects.findIndex(
                (subject) => subject.subjectID === actions.payload.subjectID
            );

            newList.splice(index, 1);
            return {
                ...state,
                subjects: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.ADD_SUBJECT: {
            const newList = [...state.subjects];
            newList.push(actions.payload);
            return {
                ...state,
                subjects: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        default:
            return state;
    }
}
