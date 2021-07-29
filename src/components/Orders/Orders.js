import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import database from '../../firebase/firebase';
import OrderCard from './OrderCard';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

const Orders = (props) => {
    const styles = homeStyles();
    const currentDayStr = dayjs().format("YYYY_MM_DD");
    const [state, setState] = useState({orderCards: [], orders: []});
    useEffect(() => {
        database.ref(`orders/${currentDayStr}`).on("value", (snapshot) => {
            const orders = snapshot.val();
            let orderCards = [];
            if (orders) {
                for (let i = 0; i < orders.length; i++) {
                    orderCards.push(<OrderCard index={i} completeOrder={completeOrder} orderData={orders[i]} />)
                }
                setState({orders, orderCards});
            }
        })
    }, [])
    const completeOrder = (index) => {
        let orders = [...state.orders];
        orders.splice(index, 1);
        database.ref(`orders/${currentDayStr}`).set(orders)
            .catch( err => console.log(err));
    }
    return (
        <div className={styles.homebg}>
            <div className={styles.header}>
                <h1 className={styles.ordersTitle}>orders</h1>
                <h2 className={styles.ordersTitle2}>订单</h2>
            </div>
            <div className={styles.orderLayout}>
                {state.orderCards}
            </div>
        </div>
    )
}

export default Orders;