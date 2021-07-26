import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';

import CartItem from "./CartItem";
import database from "../../firebase/firebase";
import { cartConsts } from "../../static/constants/cart-constants";

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
        const currentDayStr = dayjs().format("YYYY_MM_DD")
        database.ref(`orders/${currentDayStr}`).once("value")
            .then( snapshot => {
                let orders = snapshot.val();
                let table = props.match.params.number;
                if (table.indexOf("C") > -1) {
                    table = table.replace("C", cartConsts.chTablePrefix);
                }
                const order = {
                    id: orders ? orders.length : 0,
                    table, 
                    orderItems: cart
                }
                if (orders === null) {
                    orders = [order];
                } else {
                    orders = [...orders, order];
                }
                database.ref(`orders/${currentDayStr}`).set(orders)
                        .then( (e) => console.log(e))
                        .catch( err => console.log(err))
            })
            .catch( err => console.log(err))
    }
    return (
        <div style={{backgroundColor: "white"}}>
            {
            cart.length > 0 ? 
            <div className={styles.centered}>
                <Paper elevation={3} className={styles.cartBox}>
                    <div>
                    { (props.language === "english") ?
                        <span className={styles.cartTitle}>Cart</span>
                        : 
                        <span className={styles.cartTitle}>購物車</span>
                    }
                    {cartItems}
                    </div> 
                </Paper>
                <Button className={styles.addToOrderBtn} variant='contained' onClick={checkout}>Checkout</Button>
                </div>
            : 
                <Paper elevation={3} className={styles.emptyCartBox}>
                    { (props.language === "english") ?
                        <p>Your cart is empty!&nbsp;<SentimentDissatisfiedIcon /></p>
                        : 
                        <p className={styles.chinCartText}>你的購物車是空的!&nbsp;<SentimentDissatisfiedIcon /></p>
                    }
                </Paper>
            }
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart,
    language: state.lang.lang
})

export default withRouter(connect(mapStateToProps)(Cart));