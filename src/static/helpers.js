import dayjs from 'dayjs';
import { authConsts } from './constants/auth-constants';

// Calculates price of item as user selects choices
export const calculateItemPrice = (item) => {
    let totalPrice = item.price;
    let qtyCopy = 1;
    
    if (item.drinkChoice) {
        if (item.drinkChoice.comboHot) {
            totalPrice += item.drinkChoice.comboHot;
        }
    }
    if (item.addOn && item.addOn.length > 0) {
        for (let i = 0; i < item.addOn.length; ++i) {
            if (item.addOn[i].qty !== undefined) {
                totalPrice += (item.addOn[i].price * item.addOn[i].qty);
            } else if (item.addOn[i].price !== undefined) {
                totalPrice += item.addOn[i].price;
            }
        }
    }
    if (item.qty > 0) {
        qtyCopy = item.qty;
    }
    return totalPrice * qtyCopy;
}

// Builds kitchen chit
export const buildKitchenChit = (table, time, item) => {
    let kitchenChit = (`
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
                    .column {
                        float: left;
                        width: 50%;
                    }
                    .side {
                        width: 15%;
                    }
                    .middle {
                        width: 85%;
                    }
                    .row:after {
                        content: '';
                        display: table;
                        clear: both;
                    }
                </style>
            </head>
            <body>
                <div class='center30'>
                    TABLE <b>${table}</b> &emsp; ${dayjs(time).format(authConsts.DATE_TIME)}
                    <br />
                    ===============================
                    <br /><br />
                    ${item}
                    ===============================
                    <br />
                </div>
            </body>
        </html>
        `);
    return kitchenChit;
}