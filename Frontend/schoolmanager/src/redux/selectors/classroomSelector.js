import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const classroomSelector = (state) => state.Classroom;

//get
const selectClassroomSelector = createSelector(
    classroomSelector,
    (state) => state.classrooms
);
export const selectClassrooms = () => {
    return selectClassroomSelector(store.getState());
};

//udpate
const selectUpdateClassroom = createSelector(
    classroomSelector,
    (state) => state.classrooms
);
export const UpdateClassroom = () => {
    return selectUpdateClassroom(store.getState());
};

//Delete
const selectDeleteClassroom = createSelector(
    classroomSelector,
    (state) => state.classrooms
);
export const DeleteClassroom = () => {
    return selectDeleteClassroom(store.getState());
};

//create
const selectCreateClassroom = createSelector(
    classroomSelector,
    (state) => state.classrooms
);
export const CreateClassroom = () => {
    return selectCreateClassroom(store.getState());
};

//phân trang

//page
const selectPageSelector = createSelector(
    classroomSelector,
    (state) => state.page
);
export const selectPage = () => {
    return selectPageSelector(store.getState());
};

//size
const selectSizeSelector = createSelector(
    classroomSelector,
    (state) => state.size
);
export const selectSize = () => {
    return selectSizeSelector(store.getState());
};

//số lượng bản ghi
const selectTotalElementSelector = createSelector(
    classroomSelector,
    (state) => state.totalElements
);
export const selectTotalElement = () => {
    return selectTotalElementSelector(store.getState());
};
