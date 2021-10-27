import React from 'react';
import CartItemChoice from '../Cart/CartItemChoice';
import { itemChoices } from '../../static/constants/menu-constants';
import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import { calculateItemPrice } from '../../static/helpers';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const CustOrderItem = (props) => {
    const styles = menuStyles();
    const { itemData, language } = props;
    const renderChoices = () => {
        let choices = [];
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key] && itemData[key].length === undefined) {
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
                        title={itemChoices[key][language]} 
                        sugar={sugar}
                        ice={ice}
                        price={price}
                        choice={itemData[itemChoices[key].menuKey][language]} 
                    />
                )
            } else if (key === "choices" && itemData.choices.length > 0) {
                for (let i = 0; i < itemData.choices.length; i++) {
                    choices.push(
                        <CartItemChoice 
                            key={`choice/${i}`}
                            title={""}
                            choice={itemData.choices[i][language]}
                        />
                    )
                }
            }
        }
        if (itemData.proteinChoice) {
            choices.push(
                <CartItemChoice 
                        key={'proteinChoice'}
                        title={itemChoices.hasProtein[language]} 
                        choice={itemData.selectedProtein[language]} 
                />
            )
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
                    />
                )
            }
        }
        return addOns;
    }
    return (
        <div>
            <Divider />
            <Grid container spacing={3} className={styles.cartItemSection}>
                <Grid item xs={2}>
                    <span className={styles.cartQty}>{itemData.qty}</span>
                </Grid>
                <Grid item xs={7} className={(language === 'chinese') && styles.chinCartItem}>
                    <p><b>{itemData[language]}</b></p>
                </Grid>
                <Grid item xs className={styles.cartPrice}>
                    <span className={(language === 'chinese') && styles.chinCartItem}>${calculateItemPrice(itemData).toFixed(2)}</span>
                </Grid>
            </Grid>
            <div className={(language === 'english') ? styles.cartAddonTitle : styles.chinCartAddonTitle}>
                {renderChoices()}
                {renderAddOns()}
            </div>
        </div>
    )
}

export default CustOrderItem;