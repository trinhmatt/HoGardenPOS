import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CartItem from "./CartItem";

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';

//Material ui icons
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const Cart = (props) => {
    const styles = menuStyles();
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
            : 
                <div className={styles.emptyCartBox}>
                    { (props.language === "english") ?
                        <p>Your cart is empty!&nbsp;<SentimentDissatisfiedIcon /></p>
                        : 
                        <p className={styles.chinCartText}>你的購物車是空的!&nbsp;<SentimentDissatisfiedIcon /></p>
                    }
                </div>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    language: state.lang.lang
})

export default connect(mapStateToProps)(Cart);