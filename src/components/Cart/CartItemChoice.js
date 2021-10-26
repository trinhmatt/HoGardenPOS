import React, { useEffect, useState } from 'react';
import { addOnTypes } from '../../static/constants/menu-constants';

const CartItemChoice = (props) => {
    const { title, choice, editItem, qty, price, type, language } = props;
    const [state, setState] = useState({
                                choiceBody: ""
                            });
    
    useEffect(() => {
        if (title === "addOn" && type !== undefined) {
            const addOnType = type === "Change" ? "Change to" : type;
            const choiceBody = `${addOnType} ${choice}`;
            setState({...state, choiceBody})
        }
    }, [])
    const parseChoice = () => {
        let choiceValue = choice;
        if (title === "addOn" && type !== undefined) {
            const addOnType = type.indexOf("Modification") > -1 ? "Modification" : type;
            choiceValue = `${addOnTypes[addOnType][language]} ${choice}`;
        }
        return choiceValue;
    }
    
    return (
        <div onClick={editItem}>
        <span>
                <b>- </b> {parseChoice()}
                {qty && <span>Qty: {qty}</span>}
                {price !== undefined && <span> - ${(parseFloat(qty ? qty : 1)*price).toFixed(2)}</span>}
            </span>
        </div>
    )
}

export default CartItemChoice;