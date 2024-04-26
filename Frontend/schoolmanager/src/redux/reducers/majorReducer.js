import * as types from "../constants";

const initialState = {
    majors: [],
    page: 1,
    size: 10,
    totalElements: 0,
};

export default function majorReducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_LIST_MAJOR: {
            return {
                ...state,
                majors: actions.payload.majors,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.UPDATE_MAJOR: {
            const newList = [...state.majors];
            const index = state.majors.findIndex(
                (major) => major.majorID === actions.payload.majorID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                majors: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.DELETE_MAJOR: {
            const newList = [...state.majors];
            const index = state.majors.findIndex(
                (major) => major.majorID === actions.payload.majorID
            );

            newList.splice(index, 1);
            return {
                ...state,
                majors: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.ADD_MAJOR: {
            const newList = [...state.majors];
            newList.push(actions.payload);
            return {
                ...state,
                majors: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        default:
            return state;
    }
}
