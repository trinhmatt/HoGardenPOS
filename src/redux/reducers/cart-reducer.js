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
        case cartConsts.actions.updateExistingOrder:
            return {...action.updatedCart};
        case cartConsts.actions.addToExistingOrder:
            return {...state, orderItems: (state.orderItems ? [...state.orderItems, action.newItem] : [action.newItem])}
        default:
            return state;
    }
}
