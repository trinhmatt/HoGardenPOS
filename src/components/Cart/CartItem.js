import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { itemChoices } from "../../static/constants/menu-constants";
import { updateCart } from '../../redux/actions/cart-actions';

const CartItem = (props) => {
    const { itemData, language, cart, updateCart, index, table, sectionData } = props;
    const [choices, setChoices] = useState([]);
    // useEffect(() => {
    //     setChoices(renderChoices());
    // })
    const calculatePrice = (qty, price) => {
        return (parseFloat(qty)*price).toFixed(2);
    }
    const renderChoices = () => {
        let choices = [];
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key]) {
                choices.push(
                    <div key={`${key}/${itemData[itemChoices[key].menuKey][language]}`} onClick={editItem}>
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
    const editItem = () => {
        console.log(sectionData);
        props.history.push({
            pathname: "/add-item",
            state: {itemData, index, table}
        })
    }
    return (
        <div>
            <p onClick={editItem}>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));