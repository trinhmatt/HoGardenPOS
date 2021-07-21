import { authConsts } from "../../static/constants/auth-constants";

export const loginSuccess = (userData) => ({
    type: authConsts.LOGIN_SUCCESS,
    userData
})

export const loginFail = () => ({
    type: authConsts.LOGIN_FAIL
})