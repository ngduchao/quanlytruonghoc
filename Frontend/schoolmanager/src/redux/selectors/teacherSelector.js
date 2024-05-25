import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const teacherSelector = (state) => state.Teacher;

//get
const selectTeacherSelector = createSelector(
    teacherSelector,
    (state) => state.teachers
);
export const selectTeachers = () => {
    return selectTeacherSelector(store.getState());
};

//update
const selectUpdateTeacher = createSelector(
    teacherSelector,
    (state) => state.teachers
);
export const UpdateTeacher = () => {
    return selectUpdateTeacher(store.getState());
};

//delete
const selectDeleteTeacher = createSelector(
    teacherSelector,
    (state) => state.teachers
);
export const DeleteTeacher = () => {
    return selectDeleteTeacher(store.getState());
};

//create
const selectCreateTeacher = createSelector(
    teacherSelector,
    (state) => state.teachers
);
export const CreateTeacher = () => {
    return selectCreateTeacher(store.getState());
};

//phân trang

//page
const selectPageSelector = createSelector(
    teacherSelector,
    (state) => state.page
);
export const selectPage = () => {
    return selectPageSelector(store.getState());
};

//size
const selectSizeSelector = createSelector(
    teacherSelector,
    (state) => state.size
);
export const selectSize = () => {
    return selectSizeSelector(store.getState());
};

//số lượng bản ghi
const selectTotalElementSelector = createSelector(
    teacherSelector,
    (state) => state.totalElements
);
export const selectTotalElement = () => {
    return selectTotalElementSelector(store.getState());
};
