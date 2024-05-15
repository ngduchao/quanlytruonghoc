import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const registrationSubjectSelector = (state) => state.RegistrationSubject;

//get
const selectRegistrationSubjectSelector = createSelector(
    registrationSubjectSelector,
    (state) => state.registrationSubjects
);
export const selectRegistrationSubjects = () => {
    return selectRegistrationSubjectSelector(store.getState());
};

//update
const selectUpdateRegistrationSubject = createSelector(
    registrationSubjectSelector,
    (state) => state.registrationSubjects
);
export const UpdateRegistrationSubject = () => {
    return selectUpdateRegistrationSubject(store.getState());
};

//delete
const selectDeleteRegistrationSubject = createSelector(
    registrationSubjectSelector,
    (state) => state.registrationSubjects
);
export const DeleteRegistrationSubject = () => {
    return selectDeleteRegistrationSubject(store.getState());
};

//create
const selectCreateRegistrationSubject = createSelector(
    registrationSubjectSelector,
    (state) => state.registrationSubjects
);
export const CreateRegistrationSubject = () => {
    return selectCreateRegistrationSubject(store.getState());
};
