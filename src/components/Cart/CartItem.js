import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { itemChoices } from "../../static/constants/menu-constants";
import { updateCart, updateExistingOrder } from '../../redux/actions/cart-actions';
import CartItemChoice from './CartItemChoice';
import { calculateItemPrice } from '../../static/helpers';

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
    const { itemData, language, updateCart, updateExistingOrder, index, table, price, cart } = props;
    const isAdminUpdate = !!props.cart.orders; //if orders exist, it is an existing order and the admin is updating  
    let hasChoices = false;

    const renderChoices = () => {
        let choices = [];
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key] && itemData[itemChoices[key].menuKey] && itemData[key].length === undefined) {
                hasChoices = true;
                let sugar, ice, price;
                if (itemData[itemChoices[key].menuKey]['sugar'] !== undefined) {
                    sugar = itemData[itemChoices[key].menuKey]['sugar'][language];
                }
                if (itemData[itemChoices[key].menuKey]['ice'] !== undefined) {
                    ice = itemData[itemChoices[key].menuKey]['ice'][language];
                }
                if (itemData[itemChoices[key].menuKey]['comboHot'] !== undefined) {
                    price = itemData[itemChoices[key].menuKey]['comboHot'];
                }
                choices.push(
                    <CartItemChoice 
                        key={key}
                        choice={itemData[itemChoices[key].menuKey][language]} 
                        sugar={sugar}
                        ice={ice}
                        price={price}
                        editItem={editItem}
                        language={language} 
                    />
                )
            } else if (key === "choices" && itemData.choices.length > 0) {
                for (let i = 0; i < itemData.choices.length; i++) {
                    console.log(itemData)
                    choices.push(
                        <CartItemChoice 
                            key={`choice/${i}`}
                            choice={itemData.choices[i][language]}
                            editItem={editItem}
                            language={language}
                        />
                    )
                }
            } else if (key === "selectedProtein") {
                hasChoices = true;
                choices.push(
                    <CartItemChoice 
                        key={`selectedProtein/${itemData.english}/${itemData.selectedProtein.english}`}
                        choice={itemData.selectedProtein[language]}
                        editItem={editItem}
                        language={language}
                    />
                )
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
                        type={itemData.addOn[i].type}
                        price={itemData.addOn[i].price}
                        qty={itemData.addOn[i].qty}
                        language={language}
                        editItem={editItem}
                    />
                )
            }
        }
        return addOns;
        
    }

    const changeQty = (e) => {
        const qty = itemData.qty + parseInt(e.currentTarget.value);
        let cartItems = cart;
        if (isAdminUpdate) {
            // If admin update, need to find which order in the array this item belongs to 
            let foundItem = false;
            for (let i = 0; i < cartItems.orders.length; i++) {
                if (itemData.belongsToOrder === cartItems.orders[i].id) {
                    for (let n = 0; n < cartItems.orders[i].orderItems.length; n++) {
                        if (itemData.indexInOrder === n) {
                            foundItem = true;
                            if (qty > 0) {
                                cartItems.orders[i].orderItems[n].qty = qty;
                            } else {
                                cartItems.orders[i].orderItems.splice(n, 1);
                            }
                    
                        }
                    }
                }
            }
            if (!foundItem && itemData.belongsToOrder === "new") {
                for (let i = 0; i < cartItems.orderItems.length; i++) {
                    if (i === itemData.indexInOrder) {
                        if (qty > 0) {
                            cartItems.orderItems[i].qty = qty;
                        } else {
                            cartItems.orderItems.splice(i, 1);
                        }
                    }
                }
            }
        } else if (qty > 0) {
            cartItems[index].qty = qty;
        } else {
            cartItems.splice(index, 1);
        }
        isAdminUpdate ? updateExistingOrder(cartItems) : updateCart(cartItems);
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
                <Grid onClick={editItem} item xs={7} className={(language === 'chinese') ? styles.chinCartItem : ""}>
                    {(itemData.nChoices ? "Set Dinner:" : "") + `${itemData.restName ? `${itemData.restName}.` : ""} ${itemData[language]}`}
                </Grid>
                <Grid item xs className={styles.cartPrice}>
                    <span onClick={editItem} className={(language === 'chinese') ? styles.chinCartItem : ''}>
                        ${calculateItemPrice(itemData).toFixed(2)}
                    </span>
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
            {
                (renderChoices().length > 0 || (itemData.addOn && itemData.addOn.length > 0)) ?
                <Grid container spacing={3} onClick={editItem}>
                    <Grid item xs className={(language === 'english') ? styles.cartAddonTitle : styles.chinCartAddonTitle}>
                        {hasChoices && <span><b>{(props.language === "english") ? 'Choices:' : '選擇:'}</b></span>}
                        {renderChoices()}
                    </Grid>
                    <Grid item xs className={(language === 'english') ? styles.cartAddonTitle : styles.chinCartAddonTitle}>
                        {itemData.addOn && itemData.addOn.length > 0 && <span><b>{(props.language === "english") ? 'Add ons:' : '附加項目:'}</b></span>}
                        {renderAddOns()}
                    </Grid>
                </Grid>
            :
            <div></div>
            }
            <br /><br />
        </div>
    )
}

const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    updateCart: (newCart) => dispatch(updateCart(newCart)),
    updateExistingOrder: newCart => dispatch(updateExistingOrder(newCart))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CartItem));