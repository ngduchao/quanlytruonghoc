import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const facultySelector = (state) => state.Faculty;

//get
const selectFacultySelector = createSelector(
    facultySelector,
    (state) => state.faculties
);
export const selectFaculties = () => {
    return selectFacultySelector(store.getState());
};

//update
const selectUpdateFaculty = createSelector(
    facultySelector,
    (state) => state.faculties
);
export const UpdateFaculty = () => {
    return selectUpdateFaculty(store.getState());
};

//delete
const selectDeleteFaculty = createSelector(
    facultySelector,
    (state) => state.faculties
);
export const DeleteFaculty = () => {
    return selectDeleteFaculty(store.getState());
};

//create
const selectCreateFaculty = createSelector(
    facultySelector,
    (state) => state.faculties
);
export const CreateFaculty = () => {
    return selectCreateFaculty(store.getState());
};

//phân trang

//page
const selectPageSelector = createSelector(
    facultySelector,
    (state) => state.page
);
export const selectPage = () => {
    return selectPageSelector(store.getState());
};

//size
const selectSizeSelector = createSelector(
    facultySelector,
    (state) => state.size
);
export const selectSize = () => {
    return selectSizeSelector(store.getState());
};

//số lượng bản ghi
const selectTotalElementSelector = createSelector(
    facultySelector,
    (state) => state.totalElements
);
export const selectTotalElement = () => {
    return selectTotalElementSelector(store.getState());
};
