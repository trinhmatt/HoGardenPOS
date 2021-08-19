import React from 'react';

const CartItemChoice = (props) => {
    const { title, choice, editItem, qty, price } = props;
    return (
        <div onClick={editItem}>
        <span>
                <b>{title !== "addOn" && title + ':'}</b> {choice}
                {qty && <span>Qty: {qty}</span>}
                {price !== undefined && <span> - ${(parseFloat(qty ? qty : 1)*price).toFixed(2)}</span>}
            </span>
        </div>
    )
}

export default CartItemChoice;