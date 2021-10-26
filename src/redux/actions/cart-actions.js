import { cartConsts } from "../../static/constants/cart-constants";

export const addToCart = (item) => ({
    type: cartConsts.actions.add,
    item
})

export const updateCart = (newCart) => ({
    type: cartConsts.actions.update,
    newCart
})

export const updateExistingOrder = (updatedCart) => {
    console.log('updatedcart: ', updatedCart)
    return ({
        type: cartConsts.actions.updateExistingOrder,
        updatedCart
    })
}

export const addToExistingOrder = (newItem) => ({
    type: cartConsts.actions.addToExistingOrder,
    newItem
})

export const clearCart = () => ({
    type: cartConsts.actions.clear
})