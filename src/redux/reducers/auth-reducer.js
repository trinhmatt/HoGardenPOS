import { authConsts } from "../../static/constants/auth-constants";

const initState = {};

export const authReducer = (state = initState, action) => {
    switch (action.type) {
        case authConsts.LOGIN_SUCCESS:
            return {
                ...state,
                userData: action.userData
            };
        case authConsts.LOGIN_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
} 