import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { itemChoices } from "../../constants/menu-constants";
import { updateCart } from '../../redux/actions/cart-actions';

const CartItem = (props) => {
    const { itemData, language, cart, updateCart, index } = props;
    const [choices, setChoices] = useState([]);
    // useEffect(() => {
    //     setChoices(renderChoices());
    // })
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
    const renderChoices = () => {
        let choices = [];
        console.log(itemData)
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key]) {
                choices.push(
                    <div>
                        <h2>{itemChoices[key][language]}</h2>
                        <p>{itemData[itemChoices[key].menuKey][language]}</p>
                    </div>
                )
            }
        }
        return choices;
    }
    const changeQty = (e) => {
        const qty = itemData.qty + parseInt(e.currentTarget.value);
        let cartItems = [...cart];
        if (qty > 0) {
            cartItems[index].qty = qty;
        } else {
            cartItems.splice(index, 1);
        }
        updateCart(cartItems);
    }
    return (
        <div>
            <p>
                <span>{itemData.qty}</span>
                {` ${itemData[language]}`}
                <span>{calculatePrice(itemData.qty, itemData.price)}</span>
            </p>
            <div>
                <button value={-1} onClick={changeQty}>-</button>
                <button value={1} onClick={changeQty}>+</button>
            </div>
            {renderChoices()}
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    updateCart: (newCart) => dispatch(updateCart(newCart))
})

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);