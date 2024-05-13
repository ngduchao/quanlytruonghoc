import * as types from "../constants";

export function setUserLoginInfo(userDetails) {
    return {
        type: types.USER_LOGIN_INFO,
        payload: {
            userDetails: userDetails,
        },
    };
}

export function setTokenInfo(token) {
    return {
        type: types.TOKEN_INFO,
        payload: token,
    };
}
