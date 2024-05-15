import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const majorSelector = (state) => state.Major;

//get
const selectMajorSelector = createSelector(
    majorSelector,
    (state) => state.majors
);
export const selectMajors = () => {
    return selectMajorSelector(store.getState());
};

//udpate
const selectUpdateMajor = createSelector(
    majorSelector,
    (state) => state.majors
);
export const UpdateMajor = () => {
    return selectUpdateMajor(store.getState());
};

//delete
const selectDeleteMajor = createSelector(
    majorSelector,
    (state) => state.majors
);
export const DeleteMajor = () => {
    return selectDeleteMajor(store.getState());
};

//create
const selectCreateMajor = createSelector(
    majorSelector,
    (state) => state.majors
);
export const CreateMajor = () => {
    return selectCreateMajor(store.getState());
};

//phân trang

//page
const selectPageSelector = createSelector(majorSelector, (state) => state.page);
export const selectPage = () => {
    return selectPageSelector(store.getState());
};

//size
const selectSizeSelector = createSelector(majorSelector, (state) => state.size);
export const selectSize = () => {
    return selectSizeSelector(store.getState());
};

//số lượng bản ghi
const selectTotalElementSelector = createSelector(
    majorSelector,
    (state) => state.totalElements
);
export const selectTotalElement = () => {
    return selectTotalElementSelector(store.getState());
};
