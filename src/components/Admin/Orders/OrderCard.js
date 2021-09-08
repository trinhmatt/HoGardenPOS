import React from 'react'; 
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { itemChoices } from '../../../static/constants/menu-constants';
import { updateCart } from '../../../redux/actions/cart-actions';

//Style imports
import { homeStyles } from '../../../static/css/homeStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Icon imports
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const OrderCard = (props) => {
    const styles = homeStyles();
    const { orderData, completeOrder, index, updateCart } = props;
    const renderChoices = (order, itemIndex) => {
        let choicesElements = [];
        //FOR SET DINNER - ORDER == ARRAY
        if (order.length !== undefined && order.length > 0) {
            for (let i = 0; i < order.length; i++) {
                choicesElements.push(
                    <div>
                        <p className={styles.orderAddOns}>{`- ${order[i].chinese}/${order[i].english}`}</p>
                    </div>
                )
            }
        }
        //FOR EVERYTHING ELSE, ORDER == DICT 
        for (const key in order) {
            if (itemChoices[key] && order[key]) {
                choicesElements.push(
                    <div>
                        <p className={styles.orderAddOns}>{`- ${order[itemChoices[key].menuKey].chinese}/${order[itemChoices[key].menuKey].english}`}</p>
                    </div>
                )
            }
        }
        if (order.proteinChoice) {
            choicesElements.push(
                <div>
                    <p className={styles.orderAddOns}>{`- ${order.selectedProtein.chinese}/${order.selectedProtein.english}`}</p>
                </div>
            )
        }
        if (orderData.orderItems[itemIndex].addOn && orderData.orderItems[itemIndex].addOn.length > 0) {
            for (let i = 0; i < orderData.orderItems[itemIndex].addOn.length; i++) {
                choicesElements.push(
                    <div>
                        <p className={styles.orderAddOns}>{`- ${orderData.orderItems[itemIndex].addOn[i].qty ? orderData.orderItems[itemIndex].addOn[i].qty.toString()+" " : ""}${orderData.orderItems[itemIndex].addOn[i].chinese}/${orderData.orderItems[itemIndex].addOn[i].english}`}</p>
                    </div>
                )
            }
        }
        return choicesElements;
    }
    const renderOrders = () => {
        let itemElements = [];
        for (let i = 0; i < orderData.orderItems.length; i++) {
            let choicesData = orderData.orderItems[i].choices && orderData.orderItems[i].choices.length > 0 ? orderData.orderItems[i].choices : orderData.orderItems[i];
                itemElements.push(
                    <div>
                    <Divider />
                    <Grid container spacing={1} className={styles.orderGrid}>
                        <Grid item xs={2} className={styles.orderQtyGrid}>
                            <div className={styles.orderQty}>
                                {orderData.orderItems[i].qty}
                            </div>
                        </Grid>
                        <Grid item xs={9} style={{wordBreak: 'break-word'}}>
                            {orderData.orderItems[i].restName && <h2>项目名: {orderData.orderItems[i].restName}</h2>}
                            <h2>{`${orderData.orderItems[i].chinese}/${orderData.orderItems[i].english}`}</h2>
                            <div>
                                {renderChoices(choicesData, i)}
                            </div>
                        </Grid>
                    </Grid>
                    <Divider />
                    </div>
                )
        }
        return itemElements;
    }
    const startCompleteOrder = () => {
        completeOrder(index);
    }
    const startEditOrder = () => {
        updateCart(orderData);
        props.history.push(`/admin/place-order/${orderData.table}`);
    }
    return (
        <Paper elevation={3} className={styles.orderCard}>
            <Button onClick={startEditOrder}>EDIT/編輯</Button>
            <h1 className={styles.orderTable}>{orderData.table === 'takeout' ? `Takeout/外賣 #${orderData.takeoutNumber}` : `table/桌 ${orderData.table}`}</h1>
            {renderOrders()}
            <Button 
                onClick={startCompleteOrder} 
                variant='contained' 
                disableElevation
                className={styles.completeButton}
                startIcon={<CheckCircleIcon />}
            >
                <h3>COMPLETE/<b>完畢</b></h3>
            </Button>
        </Paper>
    )
}

const mapDispatchToProps = dispatch => ({
    updateCart: orderData => dispatch(updateCart(orderData))
})

export default withRouter(connect(undefined, mapDispatchToProps)(OrderCard));