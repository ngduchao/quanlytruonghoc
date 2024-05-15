import { createSelector } from "@reduxjs/toolkit";

/** Selector **/
const loginInfoSelector = (state) => state.loginInfor;

const selectUserInfoSelector = createSelector(
    loginInfoSelector,
    (state) => state.userInfo
);

/** function */
const selectTokenSelector = createSelector(
    loginInfoSelector,
    (state) => state.token
);

export const selectUserInfo = (state) => {
    return selectUserInfoSelector(state);
};

export const selectToken = (state) => {
    return selectTokenSelector(state);
};
