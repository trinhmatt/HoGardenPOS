import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CartItem from "./CartItem";

const Cart = (props) => {
    const { cart, language } = props;
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        let cartItems = [];
        for (let i = 0; i < cart.length; i++) {
            cartItems.push(<CartItem language={language} itemData={cart[i]} />)
        }
        setCartItems(cartItems);
    }, [])
    return (
        <div>
            {cartItems}
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    language: state.lang.lang
})

export default connect(mapStateToProps)(Cart);