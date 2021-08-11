import React from 'react';
import CartItemChoice from '../Cart/CartItemChoice';
import { itemChoices } from '../../static/constants/menu-constants';

const CustOrderItem = (props) => {
    const { itemData, language } = props;
    const renderChoices = () => {
        let choices = [];
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key] && key !== "hasEgg") {
                choices.push(
                    <CartItemChoice 
                        key={key}
                        title={itemChoices[key][language]} 
                        choice={itemData[itemChoices[key].menuKey][language]} 
                    />
                )
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
        if (itemData.hasEgg) {
            choices.push(
                <CartItemChoice 
                    key={'eggChoice'}
                    title={itemChoices.hasEgg[language]} 
                    choice={itemData.eggChoice[language]} 
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
            <h2>{itemData[language]}</h2>
            <p>{itemData.price}</p>
            {renderChoices()}
            {renderAddOns()}
        </div>
    )
}

export default CustOrderItem;