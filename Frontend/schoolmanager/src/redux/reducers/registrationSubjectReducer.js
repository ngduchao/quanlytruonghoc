import * as types from "../constants";

const initialState = {
    registrationSubjects: [],
};

export default function registrationSubjectReducer(
    state = initialState,
    actions
) {
    switch (actions.type) {
        case types.GET_LIST_REGISTRATION_SUBJECT: {
            return {
                ...state,
                registrationSubjects: actions.payload,
            };
        }
        case types.UPDATE_REGISTRATION_SUBJECT: {
            const newList = [...state.registrationSubjects];
            const index = state.registrationSubjects.findIndex(
                (registrationSubject) =>
                    registrationSubject.registrationSubjectID ===
                    actions.payload.registrationSubjectID
            );
            newList[index] = actions.payload;
            return {
                ...state,
                registrationSubjects: newList,
            };
        }
        case types.DELETE_REGISTRATION_SUBJECT: {
            const newList = [...state.registrationSubjects];
            const index = state.registrationSubjects.findIndex(
                (registrationSubject) =>
                    registrationSubject.registrationSubjectID ===
                    actions.payload.registrationSubjectID
            );
            newList.splice(index, 1);
            return {
                ...state,
                registrationSubjects: newList,
            };
        }
        case types.ADD_REGISTRATION_SUBJECT: {
            const newList = [...state.registrationSubjects];
            newList.push(actions.payload);
            // console.log(newList);
            // const newList = [];
            return {
                ...state,
                registrationSubjects: newList,
            };
        }
        default:
            return state;
    }
}
