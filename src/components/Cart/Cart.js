import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';

import CartItem from "./CartItem";
import database from "../../firebase/firebase";
import { cartConsts } from "../../static/constants/cart-constants";
import { authConsts } from "../../static/constants/auth-constants";
import { clearCart, updateCart } from "../../redux/actions/cart-actions";
import { calculateItemPrice } from '../../static/helpers';

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
    const { cart, language, auth, clearCart, updateCart } = props;
    const isAdmin = props.location.pathname.indexOf('admin') > -1;
    const isAdminUpdate = !!cart.orders; // If cart = array, new order; if cart = object, update existing order (for admin)
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let cartItems = [];
        let totalPrice = 0;
        let cartData = cart;
        
        //If admin view, the cart will have an array of all orders for the specific table
        if (isAdminUpdate) {
            let newCartData = [];
            // Concat all items in each order to a single array
            for (let i = 0; i < cart.orders.length; i++) {
                // Need to track which order the item belongs to for update
                for (let n = 0; n < cart.orders[i].orderItems.length; n++) {
                    cart.orders[i].orderItems[n].belongsToOrder = cart.orders[i].id;
                    cart.orders[i].orderItems[n].indexInOrder = n;
                }
                newCartData = newCartData.concat(cart.orders[i].orderItems);
            }
            // When updating, cart.orderItems is for any new items added 
            if (cart.orderItems) {
                for (let i = 0; i < cart.orderItems.length; i++) {
                    cart.orderItems[i].belongsToOrder = "new";
                    cart.orderItems[i].indexInOrder = i;
                }
                newCartData = newCartData.concat(cart.orderItems);
            }
            cartData = newCartData;
        }
        for (let i = 0; i < cartData.length; i++) {
            let price = calculateItemPrice(cartData[i]);
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
            if (cart.orderItems) {
                pushOrderToDatabase(currentDayStr);
            }
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
                    orderItems: (isAdminUpdate ? cart.orderItems : cart),
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
                            if (isAdmin) {
                                const cartForUpdates = {orders: cart.orders ? [...cart.orders, order] : [order] } ;
                                updateCart(cartForUpdates);
                            } else {
                                props.history.push({
                                    pathname: isTakeout ? `/order/${takeoutNumber}/takeout` : `/order/${table}/review`
                                });
                            }  
                        })
                        .catch( err => console.log(err))
            })
            .catch( err => console.log(err))
    }
    const updateOrderInDatabase = (dayStr) => {
        database.ref(`orders/${dayStr}`).once("value")
            .then( snapshot => {
                let orders = snapshot.val();
                if (orders) {
                    let ordersToUpdate = {}; 
                    for (let i = 0; i < cart.orders.length; i++) {
                        ordersToUpdate[cart.orders[i].id] = cart.orders[i];
                    }
                    database.ref(`orders/${dayStr}`).update(ordersToUpdate)
                        .then( () => {
                            if (isAdmin) {

                            } else {
                                clearCart();
                                props.history.push({
                                    pathname: cart.takeoutNumber ? `/order/${cart.takeoutNumber}/takeout` : `/order/${table}/review`
                                });
                            }
                            
                        })
                }

            })
    }
    return (
        <div className={!auth.userData ? styles.cartLayoutBox : styles.authCartLayoutBox}>
            {
            cartItems.length > 0 ? 
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
                    {cart.orders ? "UPDATE" : "Checkout"}
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
    clearCart: () => dispatch(clearCart()),
    updateCart: (newCart) => dispatch(updateCart(newCart))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));