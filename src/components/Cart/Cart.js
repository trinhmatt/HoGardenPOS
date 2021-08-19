import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';

import CartItem from "./CartItem";
import database from "../../firebase/firebase";
import { cartConsts } from "../../static/constants/cart-constants";
import { authConsts } from "../../static/constants/auth-constants";
import { clearCart } from "../../redux/actions/cart-actions";

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

//Material ui icons
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const Cart = (props) => {
    const isAdmin = props.match.params.number === "admin";
    const styles = menuStyles();
    const { cart, language, clearCart } = props;
    const [cartItems, setCartItems] = useState([]);
    const [table, setTable] = useState(isAdmin ? "1" : props.match.params.number);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculatePrice = (itemData) => {
        let total = itemData.price;
        if (itemData.addOn && itemData.addOn.length > 0) {
            for (let i = 0; i < itemData.addOn.length; i++) {
                total += itemData.addOn[i].price * (itemData.addOn[i].qty ? itemData.addOn[i].qty : 1.0);
            }
        }
        total *= parseFloat(itemData.qty);
        return total;
    }

    useEffect(() => {
        let cartItems = [];
        let totalPrice = 0;
        for (let i = 0; i < cart.length; i++) {
            let price = calculatePrice(cart[i]);
            totalPrice += price;
            cartItems.push(<CartItem price={price} table={props.match.params.number} key={`cartItem/${i}`} index={i} language={language} itemData={cart[i]} />)
        }
        setCartItems(cartItems);
        setTotalPrice(totalPrice);
    }, [cart])

    // for admin orders
    const setTableVal = (e) => {
        setTable(e.currentTarget.value)
    }

    const checkout = () => {
        const currentDayStr = dayjs().format(authConsts.DATE);
        //Check if any orders exist for the day
        database.ref(`orders/${currentDayStr}`).once("value")
            .then( snapshot => {
                let orders = snapshot.val();
                let tableVal = props.match.params.number !== "admin" ? props.match.params.number : table;
                // Check if the table is C(number), table name for restaurant is chinese and cant use that in route params 
                if (tableVal.indexOf("C") > -1) {
                    tableVal = tableVal.replace("C", cartConsts.chTablePrefix);
                }
                const order = {
                    id: orders ? orders.length : 0,
                    table: tableVal, 
                    orderItems: cart
                };
                // If no orders that day, create new object, otherwise add order to existing orders for the day 
                if (orders === null) {
                    orders = [order];
                } else {
                    orders = [...orders, order];
                }
                // Update order table
                database.ref(`orders/${currentDayStr}`).set(orders)
                        .then( () => {
                            clearCart();
                            props.history.push({
                                pathname:`/order/${table}/review`,
                                state: {order}
                            });
                        })
                        .catch( err => console.log(err))
            })
            .catch( err => console.log(err))
    }
    return (
        <div style={{backgroundColor: "white"}}>
            {
            cart.length > 0 ? 
            <div className={styles.cartLayout}>
                <Paper elevation={3} className={styles.cartBox}>
                    <div>
                    { (props.language === "english") ?
                        <span>
                            <span className={styles.cartTitle}>Cart</span>
                            <br />
                            <span className={styles.cartSubtitle}>(tap item to edit)</span>
                        </span>
                        :
                        <span>
                            <span className={styles.cartTitle}>購物車</span>
                            <br />
                            <span className={styles.cartSubtitle}>(點擊項目進行編輯)</span>
                        </span>
                    }
                    {cartItems}
                    </div> 
                    <h2>Sub-total: {totalPrice.toFixed(2)}</h2>
                    <h2>HST: {(totalPrice * 0.13).toFixed(2)}</h2>
                    <h2>Total: {(totalPrice * 1.13).toFixed(2)}</h2>
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
    language: state.lang.lang,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    clearCart: () => dispatch(clearCart())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));