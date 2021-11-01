import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';

import { authConsts } from '../../static/constants/auth-constants';
import database from '../../firebase/firebase';
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';

const AdminPlaceOrder = (props) => {
    const styles = menuStyles();
    let tableNumber = props.match.params.number;
    const { cart } = props;
    const [state, setState] = useState({
        receiptHtml: '',
    });
    const isNewOrder = cart.id === undefined;
    const completeOrder = () => {
        database.ref(`orders/${dayjs().format(authConsts.DATE)}`).update({[cart.id]: ""})
            .then( () => props.history.push('/admin/tables'))
            .catch( err => console.log(err));
    }
    const createReceipt = () => {
        let cartItems = '';
        const dateTime = dayjs().format('DD/MM/YYYY HH:mm:ss');
        let cartSubTotal = 0.0;
        let cartCopy = cart;
        if (cartCopy.orders) {
            let newCartCopy = [];
            for (let i = 0; i < cartCopy.orders.length; i++) {
                newCartCopy = newCartCopy.concat(cartCopy.orders[i].orderItems);
            }
        }
        for (let i = 0; i < cartCopy.length; ++i) {
            let itemTotal = (cartCopy[i].price * cartCopy[i].qty);
            cartSubTotal += (cartCopy[i].price * cartCopy[i].qty);

            let addOns = '';
            if (cartCopy[i].addOn && cartCopy[i].addOn.length > 0) {
                addOns = '<u>Add-Ons/附加組件:</u> <br />';
                for (let j = 0; j < cartCopy[i].addOn.length; ++j) {
                    //some add-ons have no price (msg, oil)
                    let addOnPrice = 0.0;
                    if (!cartCopy[i].addOn[j].price) {
                        addOnPrice = cartCopy[i].addOn[j].price;
                    }
                    console.log(cartCopy[i].addOn[j].price)
                    itemTotal += addOnPrice;
                    cartSubTotal += addOnPrice;
                    addOns += cartCopy[i].addOn[j].english
                        + '/' + cartCopy[i].addOn[j].chinese
                        + '&emsp;$' + (addOnPrice).toFixed(2)
                        + '<br />';
                }
                addOns += '<br />';
            }

            cartItems += '<div class="row"><div class="column side">'
                + cartCopy[i].qty 
                + ' &times;</div><div class="column middle">' + cartCopy[i].restName 
                + '. ' + cartCopy[i].english 
                + '/' + cartCopy[i].chinese 
                + '</div> <div class="column side">$' 
                + (itemTotal).toFixed(2)
                + '</div></div>'
                + '<div class="center25">' + addOns + '</div><br />'; 
        }
        let cartHST = ((cartSubTotal * 0.13).toFixed(2));
        let cartTotal = ((cartSubTotal * 1.13).toFixed(2));
        cartSubTotal = cartSubTotal.toFixed(2);
        
        let receiptHtml = (`
            <html>
                <head>
                    <style>
                        {
                            box-sizing: border-box;
                        }
                        .center40, .center30, .center25 {
                            text-align: center;
                            font-size: 40px;
                        }
                        .center30 {
                            font-size: 30px;
                        }
                        .center25 {
                            font-size: 25px;
                        }
                        .right30 {
                            text-align: right;
                            font-size: 30px;
                        }
                        .column {
                            float: left;
                            width: 50%;
                        }
                        .side {
                            width: 20%;
                        }
                        .middle {
                            width: 60%;
                        }
                        .row:after {
                            content: '';
                            display: table;
                            clear: both;
                        }
                    </style>
                </head>
                <body>
                    <div class='center40'>
                        HO GARDEN CHINESE RESTAURANT
                        <br />
                        半島餐廳
                    </div>
                    <div class='center30'>
                        TEL: 905-927-9623 <br />
                        ===============================
                        <br />
                        TABLE ${tableNumber} &emsp; ${dateTime}
                        <br />
                        ===============================
                        <br /><br />
                        ${cartItems}
                        ===============================
                        <br />
                    </div>
                    <div class='right30'>
                        Sub-Total &emsp;&emsp; $${cartSubTotal}
                        <br />
                        HST 13% &emsp;&emsp; $${cartHST}
                        <br />
                        Total &emsp;&emsp; $${cartTotal}
                    </div>
                </body>
            </html>
        `);
        setState({receiptHtml});
    };
    
    useEffect(() => {
        createReceipt();
    }, []);
    
    return (
        <div>
            <Grid container spacing={0}>
                <Grid item xs={4} className={styles.authCartLayout}>
                    <div className={styles.authTableNumber}>
                        table {tableNumber} 
                        <Button 
                            href={`starpassprnt://v1/print/nopreview?back=${encodeURIComponent(authConsts.CLOSE_ROUTE)}&html=${encodeURIComponent(state.receiptHtml)}`} 
                            className={styles.printerIcon}
                            >
                            <PrintIcon fontSize='large'/>
                        </Button>
                    </div>
                    <br />
                    {!isNewOrder && <button onClick={completeOrder}>COMPLETE</button>}
                    <Cart />
                </Grid>
                <Grid item xs={8} style={{overflow: 'auto', height: '100vh'}}>
                    <Grid item className={styles.cartLayout}>
                        <Menu />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

export default withRouter(connect(mapStateToProps)(AdminPlaceOrder));