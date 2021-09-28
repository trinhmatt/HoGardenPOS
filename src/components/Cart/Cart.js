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
import Divider from '@material-ui/core/Divider';

//Material ui icons
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

const Cart = (props) => {
    const styles = menuStyles();
    const table = props.match.params.number;
    const { cart, language, auth, clearCart } = props;
    const isAdminUpdate = !!cart.orderItems; // If cart = array, new order; if cart = object, update existing order (for admin)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const calculatePrice = (itemData) => {
        let total = itemData.price;
        if (itemData.addOn && itemData.addOn.length > 0) {
            for (let i = 0; i < itemData.addOn.length; i++) {
                if (itemData.addOn.price) {
                    total += itemData.addOn[i].price * (itemData.addOn[i].qty ? itemData.addOn[i].qty : 1.0);
                }
            }
        }
        total *= parseFloat(itemData.qty);
        return total;
    }

    useEffect(() => {
        let cartItems = [];
        let totalPrice = 0;
        const cartData = isAdminUpdate ? cart.orderItems : cart;
        for (let i = 0; i < cartData.length; i++) {
            let price = calculatePrice(cartData[i]);
            totalPrice += price;
            cartItems.push(<CartItem price={price} table={props.match.params.number} key={`cartItem/${i}`} index={i} language={language} itemData={cartData[i]} />)
        }
        setCartItems(cartItems);
        setTotalPrice(totalPrice);
    }, [cart, language])

    const checkout = () => {
        const currentDayStr = dayjs().format(authConsts.DATE);
        const isTakeout = table === "takeout";

        if (isAdminUpdate) {
            updateOrderInDatabase(currentDayStr);
        } else if (isTakeout) {
            database.ref(`takeoutNumber/${currentDayStr}`).once("value")
                .then( snapshot => {
                    const takeoutNumber = snapshot.val() === null ? 1 : snapshot.val()+1;
                    pushOrderToDatabase(currentDayStr, takeoutNumber);
                })
        } else {
            pushOrderToDatabase(currentDayStr);
        }
        
        
    }

    const pushOrderToDatabase = (dayStr, takeoutNumber = null) => {
        const isTakeout = takeoutNumber !== null;
        //Check if any orders exist for the day
        database.ref(`orders/${dayStr}`).once("value")
            .then( snapshot => {
                let orders = snapshot.val();
                let tableVal = props.match.params.number !== "admin" ? props.match.params.number : table;
                // Check if the table is C(number), table name for restaurant is chinese and cant use that in route params 
                if (tableVal.indexOf("C") > -1) {
                    tableVal = tableVal.replace("C", cartConsts.chTablePrefix);
                }
                let order = {
                    id: orders ? orders.length : 0,
                    table: tableVal, 
                    orderItems: cart,
                    time: dayjs().format()
                };

                if (isTakeout) {
                    order.takeoutNumber = takeoutNumber;
                    database.ref(`takeoutNumber/${dayStr}`).set(takeoutNumber);
                }

                // If no orders that day, create new object, otherwise add order to existing orders for the day 
                if (orders === null) {
                    orders = [order];
                } else {
                    orders = [...orders, order];
                }

                // Update order table
                database.ref(`orders/${dayStr}`).update({[order.id]: order})
                        .then( () => {
                            clearCart();
                            props.history.push({
                                pathname: isTakeout ? `/order/${takeoutNumber}/takeout` : `/order/${table}/review`
                            });
                        })
                        .catch( err => console.log(err))
            })
            .catch( err => console.log(err))
    }
    const updateOrderInDatabase = (dayStr) => {
        database.ref(`orders/${dayStr}`).once("value")
            .then( snapshot => {
                let orders = snapshot.val();
                let indexOfOrder = -1;
                if (orders) {
                    for (let i = 0; i < orders.length; i++) {
                        if (orders[i].table === cart.table || (orders[i].table === "takeout" && orders[i].takeoutNumber === cart.takeoutNumber)) {
                            indexOfOrder = i;
                        }
                    }
                    if (indexOfOrder > -1) {
                        database.ref(`orders/${dayStr}`).update({[indexOfOrder]: cart})
                            .then( () => {
                                clearCart();
                                props.history.push({
                                    pathname: cart.takeoutNumber ? `/order/${cart.takeoutNumber}/takeout` : `/order/${table}/review`
                                });
                            })
                    }
                }

            })
    }
    return (
        <div className={!auth.userData ? styles.cartLayoutBox : styles.authCartLayoutBox}>
            {
            cart.length > 0 || cart.orderItems && cart.orderItems.length > 0 ? 
            <div className={styles.cartLayout}>
                <Paper elevation={3} className={!auth.userData ? styles.cartBox : styles.authCartBox}>
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
                    <div style={{width: '100%'}}>
                        <Divider />
                    </div>
                    <br />
                    <div className={(language === 'english') ? styles.cartTotals : styles.chinCartTotals}>
                    { (props.language === "english") ?
                        <div>
                            <div className={styles.cartBorder}>
                                <span>Subtotal: ${totalPrice.toFixed(2)}</span>
                                <span>HST: ${(totalPrice * 0.13).toFixed(2)}</span>
                            </div>
                            <div className={styles.cartBorder}>
                                <span><b>Total: ${(totalPrice * 1.13).toFixed(2)}</b></span>
                            </div>
                        </div>
                        :
                        <div>
                            <div className={styles.cartBorder}>
                                <span>小計: ${totalPrice.toFixed(2)}</span>
                                <span>HST: ${(totalPrice * 0.13).toFixed(2)}</span>
                            </div>
                            <div className={styles.cartBorder}>
                                <span><b>全部的: ${(totalPrice * 1.13).toFixed(2)}</b></span>
                            </div>
                        </div>
                    }
                    </div>
                    <br /><br /><br />
                </Paper>
                <Button className={auth.userData ? styles.authAddToOrderBtn : styles.addToOrderBtn} variant='contained' onClick={checkout}>
                    {cart.orderItems ? "UPDATE" : "Checkout"}
                </Button>
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