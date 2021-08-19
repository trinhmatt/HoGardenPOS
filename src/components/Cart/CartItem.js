import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { itemChoices, itemTitleEnum } from "../../static/constants/menu-constants";
import { updateCart } from '../../redux/actions/cart-actions';
import CartItemChoice from './CartItemChoice';

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
    const { itemData, language, cart, updateCart, index, table, price } = props;

    const renderChoices = () => {
        let choices = [];
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key] && itemData[itemChoices[key].menuKey]) {
                choices.push(
                    <CartItemChoice 
                        key={key}
                        title={itemChoices[key][language]} 
                        choice={itemData[itemChoices[key].menuKey][language]} 
                        editItem={editItem} 
                    />
                )
            } else if (key === "choices") {
                for (let i = 0; i < itemData.choices.length; i++) {
                    choices.push(
                        <CartItemChoice 
                            key={`choice/${i}`}
                            title={""}
                            choice={itemData.choices[i][language]}
                            editItem={editItem}
                        />
                    )
                }
            } 
        }
        return choices;
    }

    const renderAddOns = () => {
        let addOns = [];
        if (itemData.addOn && itemData.addOn.length > 0) {
            for (let i = 0; i < itemData.addOn.length; i++) {
                addOns.push(
                    <CartItemChoice 
                        key={`addOn/${i}`}
                        title={"addOn"}
                        choice={itemData.addOn[i][language]}
                        price={itemData.addOn[i].price}
                        qty={itemData.addOn[i].qty}
                        editItem={editItem}
                    />
                )
            }
        }
        return addOns;
        
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
        props.history.push({
            pathname: "/add-item",
            state: {itemData, index, table}
        })
    }

    return (
        <div>
            <br />
        <Divider />
            <Grid container spacing={3} className={styles.cartItemSection}>
                <Grid onClick={editItem} item xs={2}>
                    <span className={styles.cartQty}>{itemData.qty}</span>
                </Grid>
                <Grid onClick={editItem} item xs={7}>
                    <p>{(itemData.maxChoices ? "Set Dinner:" : "") + ` ${itemData[language]}`} </p>
                </Grid>
                <Grid item xs className={styles.cartPrice}>
                    <span onClick={editItem}>${price.toFixed(2)}</span>
                    <div className={styles.row}>
                        <IconButton className={styles.cartQtyBtns} value={-1} onClick={changeQty}>
                            <IndeterminateCheckBoxIcon className={styles.qtyBtnColor} />
                        </IconButton>
                        <IconButton className={styles.cartQtyBtns} value={1} onClick={changeQty}>
                            <AddBox className={styles.qtyBtnColor} />
                        </IconButton>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3} onClick={editItem}>
                <Grid item xs className={styles.cartAddonTitle}>
                    {renderChoices()}
                </Grid>
                <Grid item xs className={styles.cartAddonTitle}>
                    {itemData.addOn && itemData.addOn.length > 0 && <span><b>{(props.language === "english") ? 'Add ons:' : '附加項目:'}</b></span>}
                    {renderAddOns()}
                </Grid>
            </Grid>
            <br /><br />
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