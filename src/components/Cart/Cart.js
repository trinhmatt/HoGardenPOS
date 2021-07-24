import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import CartItem from "./CartItem";

const Cart = (props) => {
    const { cart, language } = props;
    const [cartItems, setCartItems] = useState([]);
    const renderCartItems = () => {
        console.log('hi')
        
    }
    useEffect(() => {
        let cartItems = [];
        for (let i = 0; i < cart.length; i++) {
            cartItems.push(<CartItem table={props.match.params.number} key={`cartItem/${i}`} index={i} language={language} itemData={cart[i]} />)
        }
        setCartItems(cartItems)
    }, [cart])
    return (
        <div style={{backgroundColor: "white"}}>
            {
            cart.length > 0 ? <div>{cartItems}</div>
            : <div><h3>Cart is empty!</h3></div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    language: state.lang.lang
})

export default withRouter(connect(mapStateToProps)(Cart));