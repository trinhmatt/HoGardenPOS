import { cartConsts } from "../../static/constants/cart-constants";

const initState = [];

export const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case cartConsts.actions.add:
            return [...state, action.item];
        case cartConsts.actions.update:
            return action.newCart;
        case cartConsts.actions.clear:
            return initState;
        default:
            return state;
    }
}
