import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { itemChoices } from "../../static/constants/menu-constants";
import { updateCart } from '../../redux/actions/cart-actions';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

//Icon imports
import AddBox from '@material-ui/icons/AddBox';
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';

const CartItem = (props) => {
    const styles = menuStyles();
    const { itemData, language, cart, updateCart, index, table, sectionData } = props;
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
            <Grid container spacing={3} className={styles.cartItemSection}>
                <Grid onClick={editItem} item xs={2}>
                    <span><span className={styles.cartQty}>{itemData.qty}</span>&nbsp;&times;</span>
                </Grid>
                <Grid onClick={editItem} item xs={7}>
                    <p>{` ${itemData[language]}`} </p>
                </Grid>
                <Grid item xs className={styles.cartPrice}>
                    <span onClick={editItem}>${calculatePrice(itemData.qty, itemData.price)}</span>
                    <div className={styles.row}>
                        <IconButton className={styles.cartQtyBtns} value={-1} onClick={changeQty}>
                            <IndeterminateCheckBoxIcon className={styles.qtyBtnColor}/>
                        </IconButton>
                        <IconButton className={styles.cartQtyBtns} value={1} onClick={changeQty}>
                            <AddBox className={styles.qtyBtnColor}/>
                        </IconButton>
                    </div>
                </Grid>
                <Grid onClick={editItem} item xs={12}>
                {renderChoices()}
                </Grid>
            </Grid>
            <Divider />
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