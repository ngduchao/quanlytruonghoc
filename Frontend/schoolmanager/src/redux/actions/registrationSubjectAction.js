import * as types from "../constants";

export function getListRegistrationSubjectAction(registrationSubjects) {
    return {
        type: types.GET_LIST_REGISTRATION_SUBJECT,
        payload: registrationSubjects,
    };
}

export function updateRegistrationSubjectAction(registrationSubject) {
    return {
        type: types.UPDATE_REGISTRATION_SUBJECT,
        payload: registrationSubject,
    };
}

export function deleteRegistrationSubjectAction(registrationSubject) {
    return {
        type: types.DELETE_REGISTRATION_SUBJECT,
        payload: registrationSubject,
    };
}

export function addRegistrationSubjectAction(registrationSubject) {
    return {
        type: types.ADD_REGISTRATION_SUBJECT,
        payload: registrationSubject,
    };
}
