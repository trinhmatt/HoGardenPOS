import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CartItem from "./CartItem";

const Cart = (props) => {
    const { cart, language } = props;
    const renderCartItems = () => {
        let cartItems = [];
        for (let i = 0; i < cart.length; i++) {
            cartItems.push(<CartItem key={`cartItem/${i}`} index={i} language={language} itemData={cart[i]} />)
        }
        return cartItems;
    }
    return (
        <div style={{backgroundColor: "white"}}>
            {
            cart.length > 0 ? renderCartItems() 
            : <div><h3>Cart is empty!</h3></div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    language: state.lang.lang
})

export default connect(mapStateToProps)(Cart);