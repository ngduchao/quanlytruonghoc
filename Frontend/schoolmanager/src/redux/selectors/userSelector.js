import { createSelector } from "@reduxjs/toolkit";
import store from "../store";

const userSelector = (state) => state.User;

//get
const selectUserSelector = createSelector(userSelector, (state) => state.users);
export const selectUsers = () => {
    return selectUserSelector(store.getState());
};

//update
const selectUpdateUser = createSelector(userSelector, (state) => state.users);
export const UpdateUser = () => {
    return selectUpdateUser(store.getState());
};

//delete
const selectDeleteUser = createSelector(userSelector, (state) => state.users);
export const DeleteUser = () => {
    return selectDeleteUser(store.getState());
};

//create
const selectCreateUser = createSelector(userSelector, (state) => state.users);
export const CreateUser = () => {
    return selectCreateUser(store.getState());
};

//phân trang

//page
const selectPageSelector = createSelector(userSelector, (state) => state.page);
export const selectPage = () => {
    return selectPageSelector(store.getState());
};

//size
const selectSizeSelector = createSelector(userSelector, (state) => state.size);
export const selectSize = () => {
    return selectSizeSelector(store.getState());
};

//số lượng bản ghi
const selectTotalElementSelector = createSelector(
    userSelector,
    (state) => state.totalElements
);
export const selectTotalElement = () => {
    return selectTotalElementSelector(store.getState());
};
