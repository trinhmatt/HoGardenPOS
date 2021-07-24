import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';

import CartItem from "./CartItem";
import database from "../../firebase/firebase";

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';

//Material ui icons
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const Cart = (props) => {
    const styles = menuStyles();
    const { cart, language } = props;
    const [cartItems, setCartItems] = useState([]);
    useEffect(() => {
        let cartItems = [];
        for (let i = 0; i < cart.length; i++) {
            cartItems.push(<CartItem table={props.match.params.number} key={`cartItem/${i}`} index={i} language={language} itemData={cart[i]} />)
        }
        setCartItems(cartItems)
    }, [cart])
    const checkout = () => {


    }
    return (
        <div style={{backgroundColor: "white"}}>
            {
            cart.length > 0 ? 
                <div>
                    {cartItems}
                    <button onClick={checkout}>Checkout</button>
                </div> 
            : 
                <div className={styles.emptyCartBox}>
                    { (language === "english") ?
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

export default withRouter(connect(mapStateToProps)(Cart));