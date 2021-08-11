import React from 'react';

const CartItemChoice = (props) => {
    const { title, choice, editItem, qty, price } = props;
    return (
        <div onClick={editItem}>
            <h2>{title !== "addOn" && title}</h2>
            <p>{choice}</p>
            {qty && <p>Qty: {qty}</p>}
            {price !== undefined && <p>${(parseFloat(qty ? qty : 1)*price).toFixed(2)}</p>}
        </div>
    )
}

export default CartItemChoice;