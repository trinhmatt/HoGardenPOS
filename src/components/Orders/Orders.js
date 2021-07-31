import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import database from '../../firebase/firebase';
import OrderCard from './OrderCard';
import { authConsts } from '../../static/constants/auth-constants';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

const Orders = (props) => {
    const styles = homeStyles();
    const currentDayStr = dayjs().format(authConsts.DATE);
    const [orderObjs, setOrders] = useState([]);
    useEffect(() => {
        database.ref(`orders/${currentDayStr}`).on("value", (snapshot) => {
            const orders = snapshot.val();
            setOrders(orders);
        })
    }, [])
    const renderOrders = () => {
        if (orderObjs && orderObjs.length > 0) {
            let orderCards = [];
            for (let i = 0; i < orderObjs.length; i++) {
                orderCards.push(<OrderCard key={`i/${orderObjs[i].table}`} index={i} completeOrder={completeOrder} orderData={orderObjs[i]} />)
            }
            return orderCards;
        }
    }
    const completeOrder = (index) => {
        const order = orderObjs[index];
        database.ref(`old_orders/${currentDayStr}`).once("value")
            .then( snapshot => {
                let orders = snapshot.val();
                if (orders) {
                    orders.push(order);
                } else {
                    orders = [order];
                }
                database.ref(`old_orders/${currentDayStr}`).set(orders)
                    .then( () => {
                        let newOrders = [...orderObjs];
                        newOrders.splice(index, 1);
                        database.ref(`orders/${currentDayStr}`).set(newOrders)
                            .catch( err => console.log(err));
                    })
            })
    }
    return (
        <div className={styles.homebg}>
            <div className={styles.header}>
                <h1 className={styles.ordersTitle}>orders</h1>
                <h2 className={styles.ordersTitle2}>订单</h2>
            </div>
            <div className={styles.orderLayout}>
                {renderOrders()}
            </div>
        </div>
    )
}

export default Orders;