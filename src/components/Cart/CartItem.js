import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { itemChoices } from "../../constants/menu-constants";
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
            <Grid container spacing={3} className={styles.cartItemSection}>
                <Grid item xs={2}>
                    <span><span className={styles.cartQty}>{itemData.qty}</span>&nbsp;&times;</span>
                </Grid>
                <Grid item xs={7}>
                    {` ${itemData[language]}`}
                </Grid>
                <Grid item xs className={styles.cartPrice}>
                    <span>${calculatePrice(itemData.qty, itemData.price)}</span>
                    <div className={styles.row}>
                        <IconButton className={styles.cartQtyBtns} value={-1} onClick={changeQty}>
                            <IndeterminateCheckBoxIcon className={styles.qtyBtnColor}/>
                        </IconButton>
                        <IconButton className={styles.cartQtyBtns} value={1} onClick={changeQty}>
                            <AddBox className={styles.qtyBtnColor}/>
                        </IconButton>
                    </div>
                </Grid>
                <Grid item xs={12}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);