import React, { useEffect, useState } from 'react';

const CartItemChoice = (props) => {
    const { title, choice, editItem, qty, price, type } = props;
    const [state, setState] = useState({
                                choiceBody: choice
                            });
    
    useEffect(() => {
        if (title === "addOn" && type !== undefined) {
            const addOnType = type === "Change" ? "Change to" : type;
            const choiceBody = `${addOnType} ${choice}`;
            setState({...state, choiceBody})
        }
    }, [])
    
    return (
        <div onClick={editItem}>
        <span>
                <b>- </b> {state.choiceBody}
                {qty && <span>Qty: {qty}</span>}
                {price !== undefined && <span> - ${(parseFloat(qty ? qty : 1)*price).toFixed(2)}</span>}
            </span>
        </div>
    )
}

export default CartItemChoice;