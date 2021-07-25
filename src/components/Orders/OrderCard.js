import React from 'react'; 
import { itemChoices } from '../../static/constants/menu-constants';

const OrderCard = (props) => {
    const { orderData } = props;
    const renderChoices = (order) => {
        let choicesElements = [];
        for (const key in order) {
            if (itemChoices[key] && order[key]) {
                choicesElements.push(
                    <div>
                        <p>{`${order[itemChoices[key].menuKey].chinese}/${order[itemChoices[key].menuKey].english}`}</p>
                    </div>
                )
            }
        }
        if (order.proteinChoice) {
            choicesElements.push(
                <div>
                    <p>{`${order.proteinChoice.chinese}/${order.proteinChoice.english}`}</p>
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
                    <h2>{orderData.orderItems[i].restName}</h2>
                    <h2>{`${orderData.orderItems[i].chinese}/${orderData.orderItems[i].english}`}</h2>
                    <p>{orderData.orderItems[i].qty}</p>
                    <div>
                        {renderChoices(orderData.orderItems[i])}
                    </div>
                </div>
            )
        }
        return itemElements;
    }
    return (
        <div>
            <h1>Table {orderData.table}</h1>
            <div>
                {renderOrders()}
            </div>
        </div>
    )
}

export default OrderCard;