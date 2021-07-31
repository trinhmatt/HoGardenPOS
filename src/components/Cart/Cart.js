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
    const { cart, language, auth } = props;
    const [cartItems, setCartItems] = useState([]);
    const [table, setTable] = useState("1");
    useEffect(() => {
        let cartItems = [];
        for (let i = 0; i < cart.length; i++) {
            cartItems.push(<CartItem table={props.match.params.number} key={`cartItem/${i}`} index={i} language={language} itemData={cart[i]} />)
        }
        setCartItems(cartItems)
    }, [cart])
    const renderTables = () => {
        let tables = [];
        for (const table in cartConsts.tables) {
            const tableVal = table.indexOf("C") > -1 ? table.replace("C", "門口") : table;
            tables.push(<option value={tableVal}>{tableVal}</option>)
        }
        return tables;
    }
    const setTableVal = (e) => {
        setTable(e.currentTarget.value)
    }
    const checkout = () => {
        const currentDayStr = dayjs().format("YYYY_MM_DD");
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
            <div className={styles.centered}>
                <Paper elevation={3} className={styles.cartBox}>
                    {
                        auth.userData && 
                            <div>
                                <label for="table">{'桌子 '}</label>
                                <select onChange={setTableVal} name="table">
                                    {renderTables()}
                                </select>
                            </div>
                    }
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
    language: state.lang.lang,
    auth: state.auth
})

export default withRouter(connect(mapStateToProps)(Cart));