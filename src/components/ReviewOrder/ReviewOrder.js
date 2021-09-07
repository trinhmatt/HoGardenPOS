import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import database from '../../firebase/firebase';
import CustOrderItem from './CustOrderItem';
import { authConsts } from '../../static/constants/auth-constants';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';

const ReviewOrder = (props) => {
    const styles = menuStyles();
    const { language, auth } = props;
    const [state, setState] = useState({
        errorMsg: null,
        itemElements: [],
        allOrders: [],
        indexOfOrder: -1,
        orderSubtotal: 0.0
    });
    const currentDayStr = dayjs().format(authConsts.DATE);

    const fetchOrder = () => {
        return new Promise((resolve, reject) => {
            database.ref(`orders/${currentDayStr}`).once("value")
                .then(snapshot => {
                    const orders = snapshot.val();
                    const tableNum = props.match.params.number.indexOf("C") > -1 ? props.match.params.number.replace("C", "門口") : props.match.params.number;
                    const isTakeout = props.location.pathname.indexOf("takeout") > -1;
                    if (orders) {
                        for (let i = 0; i < orders.length; i++) {
                            if ( (tableNum === orders[i].table && !isTakeout) || (isTakeout && orders[i].takeoutNumber && tableNum === orders[i].takeoutNumber.toString()) ) {
                                resolve({orderData: orders[i], allOrders: orders, index: i});
                            } 
                        }
                    } else {
                        reject("no order");
                    }
                    
                })
                .catch(err => reject(err));
        })
    }
    const renderOrder = () => {
        fetchOrder().then( (fetchedData) => {
            if (auth.userData) {
                return buildItemElements(fetchedData.orderData, fetchedData.allOrders, fetchedData.index);
            } else {
                return buildItemElements(fetchedData.orderData);
            }
        }).catch((err) => {
            if (err === "no order") {
                setState({ ...state, errorMsg: "No order exists!" });
            }
        })
    }
    const calculatePrice = (orderItem) => {
        let price = 0.0;
        price += orderItem.price;
        if (orderItem.addOn && orderItem.addOn.length > 0) {
            for (let n = 0; n < orderItem.addOn.length; n++) {
                price += orderItem.addOn[n].price;
            }
        }
        return price;
    }
    const buildItemElements = (order, allOrders = [], index = -1) => {
        let itemElements = [];
        let orderSubtotal = 0.0;
        for (let i = 0; i < order.orderItems.length; i++) {
            itemElements.push(<CustOrderItem key={`${i}/item`} language={language} itemData={order.orderItems[i]} />);
            orderSubtotal += calculatePrice(order.orderItems[i])
        }
        setState({ ...state, itemElements, allOrders, index, orderSubtotal })
    }

    const completeOrder = () => {
        const order = state.allOrders[state.index];
        database.ref(`old_orders/${currentDayStr}`).once("value")
            .then(snapshot => {
                let orders = snapshot.val();
                if (orders) {
                    orders.push(order);
                } else {
                    orders = [order];
                }
                database.ref(`old_orders/${currentDayStr}`).set(orders)
                    .then(() => {
                        let newOrders = [...state.allOrders];
                        newOrders.splice(state.index, 1);
                        database.ref(`orders/${currentDayStr}`).set(newOrders)
                            .then(() => props.history.push("/admin/tables"))
                            .catch(err => console.log(err));
                    })
            })
    }

    useEffect(() => {
        renderOrder();
    }, [])
    return (
        <div className={styles.kindaCentered}>
            <h3 className={styles.ribbon}>
                {
                !state.errorMsg ?
                    <span>Thanks for your order</span>
                    :
                    <span>{state.errorMsg}</span>
                }
            </h3>
            <div className={styles.reviewLayout}>
                <Paper className={styles.reviewBox} elevation={3}>
                    {state.itemElements}
                    <div>
                        <p>Subtotal: {state.orderSubtotal.toFixed(2)}</p>
                        <p>HST: {(state.orderSubtotal * 0.13).toFixed(2)}</p>
                        <p>TOTAL: {(state.orderSubtotal * 1.13).toFixed(2)}</p>
                    </div>
                    {
                        auth.userData && !state.errorMsg &&
                        <div>
                            <button onClick={completeOrder}>COMPLETE ORDER</button>
                        </div>
                    }
                </Paper>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang,
    auth: state.auth
})

export default withRouter(connect(mapStateToProps)(ReviewOrder));