import React from 'react'; 
import { itemChoices } from '../../static/constants/menu-constants';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Icon imports
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const OrderCard = (props) => {
    const styles = homeStyles();
    const { orderData, completeOrder, index } = props;
    const renderChoices = (order) => {
        let choicesElements = [];
        for (const key in order) {
            if (itemChoices[key] && order[key]) {
                choicesElements.push(
                    <div>
                        <p className={styles.orderAddOns}>{`${order[itemChoices[key].menuKey].chinese}/${order[itemChoices[key].menuKey].english}`}</p>
                    </div>
                )
            }
        }
        if (order.proteinChoice) {
            choicesElements.push(
                <div>
                    <p className={styles.orderAddOns}>{`${order.proteinChoice.chinese}/${order.proteinChoice.english}`}</p>
                </div>
            )
        }
        return choicesElements;
    }
    const renderOrders = () => {
        let itemElements = [];
        for (let i = 0; i < orderData.orderItems.length; i++) {
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
                        <h2>项目名: {orderData.orderItems[i].restName}</h2>
                        <h2>{`${orderData.orderItems[i].chinese}/${orderData.orderItems[i].english}`}</h2>
                        <div>
                            {renderChoices(orderData.orderItems[i])}
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
    return (
        <Paper elevation={3} className={styles.orderCard}>
            <h1 className={styles.orderTable}>table/桌 {orderData.table}</h1>
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

export default OrderCard;