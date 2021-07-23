import { cartConsts } from "../../static/constants/cart-constants";

export const addToCart = (item) => ({
    type: cartConsts.actions.add,
    item
})

export const updateCart = (newCart) => ({
    type: cartConsts.actions.update,
    newCart
})