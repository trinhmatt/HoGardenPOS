import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { withRouter } from 'react-router';

import database from '../../../firebase/firebase';
import OrderCard from './OrderCard';
import { authConsts } from '../../../static/constants/auth-constants';

//Style imports
import { homeStyles } from '../../../static/css/homeStyles';

//Material ui imports
import Button from '@material-ui/core/Button';

const Orders = (props) => {
    const { isTakeout } = props;
    const styles = homeStyles();
    const currentDayStr = dayjs().format(authConsts.DATE);
    const [state, setState] = useState({
                                orderObjs: [],
                                displayDrinks: false
                            });
    useEffect(() => {
        database.ref(`orders/${currentDayStr}`).on("value", (snapshot) => {
            let orders = snapshot.val();
            console.log(orders)
            if (orders !== null) {
                orders.reverse();
            }
            setState({...state, orderObjs: orders});
        })
    }, [])
    const renderOrders = () => {
        if (state.orderObjs && state.orderObjs.length > 0) {
            let orderCards = [];
            for (let i = 0; i < state.orderObjs.length; i++) {
                if (state.orderObjs[i]) {
                    if (isTakeout) {
                        if (state.orderObjs[i].table === "takeout") {
                            orderCards.push(<OrderCard key={`i/${state.orderObjs[i].takeoutNumber}`} index={i} completeOrder={completeOrder} orderData={state.orderObjs[i]} />);
                        }
                    } else {
                        orderCards.push(<OrderCard key={`i/${state.orderObjs[i].table}/${state.orderObjs[i].takeoutNumber}`} index={i} completeOrder={completeOrder} orderData={state.orderObjs[i]} />);
                    }
                }
            }
            return orderCards;
        }
    }
    
    const completeOrder = (index) => {
        const order = state.orderObjs[index];
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
                        // let newOrders = [...state.orderObjs];
                        // newOrders.splice(index, 1);
                        const actualIndex = (state.orderObjs.length-1)-index;
                        database.ref(`orders/${currentDayStr}`).update({[actualIndex]: ""})
                            .catch( err => console.log(err));
                    })
            })
    }
    return (
        <div className={styles.homebg}>
            <div className={styles.header}>
                <h1 className={styles.subTitle}>{isTakeout ? "takeout" : "orders"}</h1>
                <h2 className={styles.subTitle2}>{isTakeout ? "外賣" : "订单"}</h2>
                <Button
                    onClick={() => props.history.push('/admin/past-orders')}
                    variant='contained'
                    size='large'
                >
                    VIEW PAST ORDERS <br />
                    查看過去的訂單
                </Button>
            </div>
            <div className={styles.orderLayout}>
                {renderOrders()}
            </div>
        </div>
    )
}

export default withRouter(Orders);