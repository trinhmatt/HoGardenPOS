import React from 'react';

const CartItem = (props) => {
    const { itemData, language } = props;
    const calculatePrice = (qty, price) => {
        let priceStr = (parseFloat(qty)*price).toString();
        if (priceStr.indexOf(".") > -1) {
            if (priceStr.substring(priceStr.indexOf(".")).length === 2) {
                priceStr += "0";
            }
        } else {
            priceStr += ".00";
        }
        return priceStr;
    }
    return (
        <div>
            <p>
                <span>{itemData.qty}</span>
                {` ${itemData[language]}`}
                <span>{calculatePrice(itemData.qty, itemData.price)}</span>
            </p>

        </div>
    )
}

export default CartItem;