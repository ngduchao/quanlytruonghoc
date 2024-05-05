import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const subjectSelector = (state) => state.Subject;

//get
const selectSubjectSelector = createSelector(
    subjectSelector,
    (state) => state.subjects
);
export const selectSubjects = () => {
    return selectSubjectSelector(store.getState());
};

//update
const selectUpdateSubject = createSelector(
    subjectSelector,
    (state) => state.subjects
);
export const UpdateSubject = () => {
    return selectUpdateSubject(store.getState());
};

//delete
const selectDeleteSubject = createSelector(
    subjectSelector,
    (state) => state.subjects
);
export const DeleteSubject = () => {
    return selectDeleteSubject(store.getState());
};

//create
const selectCreateSubject = createSelector(
    subjectSelector,
    (state) => state.subjects
);
export const CreateSubject = () => {
    return selectCreateSubject(store.getState());
};

//phân trang

//page
const selectPageSelector = createSelector(
    subjectSelector,
    (state) => state.page
);
export const selectPage = () => {
    return selectPageSelector(store.getState());
};

//size
const selectSizeSelector = createSelector(
    subjectSelector,
    (state) => state.size
);
export const selectSize = () => {
    return selectSizeSelector(store.getState());
};

//số lượng bản ghi
const selectTotalElementSelector = createSelector(
    subjectSelector,
    (state) => state.totalElements
);
export const selectTotalElement = () => {
    return selectTotalElementSelector(store.getState());
};
