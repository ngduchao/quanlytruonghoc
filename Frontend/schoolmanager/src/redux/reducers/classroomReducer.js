import * as types from "../constants";

const initialState = {
    classrooms: [],
    page: 1,
    size: 10,
    totalElements: 0,
};

export default function userReducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_LIST_CLASSROOM: {
            return {
                ...state,
                classrooms: actions.payload.classrooms,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.UPDATE_CLASSROOM: {
            const newList = [...state.classrooms];
            const index = state.classrooms.findIndex(
                (classroom) =>
                    classroom.classRoomID === actions.payload.classRoomID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                classrooms: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.DELETE_CLASSROOM: {
            const newList = [...state.classrooms];
            const index = state.classrooms.findIndex(
                (classroom) =>
                    classroom.classRoomID === actions.payload.classRoomID
            );
            newList.splice(index, 1);
            return {
                ...state,
                classrooms: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.ADD_CLASSROOM: {
            const newList = [...state.classrooms];
            newList.push(actions.payload);
            return {
                ...state,
                classrooms: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        default:
            return state;
    }
}
