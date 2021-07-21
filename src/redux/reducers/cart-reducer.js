import { cartConsts } from "../../static/constants/cart-constants";

const initState = [];

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            return [...state, action.item];
        default:
            return state;
    }
}
