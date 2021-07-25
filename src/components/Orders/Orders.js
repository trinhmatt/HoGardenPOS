import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import database from '../../firebase/firebase';
import OrderCard from './OrderCard';

const Orders = (props) => {
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
        <div>
            <h1>Orders</h1>
            <div>
                {orderCards}
            </div>
        </div>
    )
}

export default Orders;