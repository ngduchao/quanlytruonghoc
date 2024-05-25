import * as types from "../constants";

const initialState = {
    users: [],
    page: 1,
    size: 10,
    totalElements: 0,
};

export default function userReducer(state = initialState, actions) {
    switch (actions.type) {
        case types.GET_LIST_USER: {
            return {
                ...state,
                users: actions.payload.users,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.UPDATE_USER: {
            const newList = [...state.users];
            const index = state.users.findIndex(
                (user) => user.userID === actions.payload.userID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                users: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.DELETE_USER: {
            const newList = [...state.users];
            const index = state.users.findIndex(
                (user) => user.userID === actions.payload.userID
            );
            newList.splice(index, 1);
            return {
                ...state,
                users: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        case types.ADD_USER: {
            const newList = [...state.users];
            newList.push(actions.payload);
            return {
                ...state,
                users: newList,
                page: actions.payload.page,
                totalElements: actions.payload.totalElements,
            };
        }
        default:
            return state;
    }
}
