import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import database from '../../firebase/firebase';
import OrderCard from './OrderCard';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

//Subcomponent imports
import BottomNav from '../subcomponents/BottomNav';

const Orders = (props) => {
    const styles = homeStyles();
    const [orderCards, setOrderCards] = useState([]);
    useEffect(() => {
        const currentDayStr = dayjs().format("YYYY_MM_DD");
        database.ref(`orders/${currentDayStr}`).on("value", (snapshot) => {
            const orders = snapshot.val();
            let orderCards = [];
            if (orders) {
                for (let i = 0; i < orders.length; i++) {
                    orderCards.push(<OrderCard orderData={orders[i]} />)
                }
                setOrderCards(orderCards);
            }
        })
    }, [])
    return (
        <div className={styles.homebg}>
            <div className={styles.header}>
                <h1 className={styles.ordersTitle}>orders</h1>
                <h2 className={styles.ordersTitle2}>订单</h2>
            </div>
            <div className={styles.orderLayout}>
                {orderCards}
            </div>
            <BottomNav />
        </div>
    )
}

export default Orders;