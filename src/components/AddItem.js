import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addToCart, updateCart } from '../redux/actions/cart-actions';
import { itemChoices } from '../static/constants/menu-constants';

// need to include functionality for if they want more than 1 AND the item has options
const AddItem = (props) => {
    const { itemData, table, index } = props.location.state;
    
    // Section data will be from the menu when adding or from itemData when editing
    const sectionData = props.location.state.sectionData ? props.location.state.sectionData : itemData.sectionData;

    const { addToCart, language, cart, updateCart } = props;
    const [item, setItem] = useState({qty: itemData.qty ? itemData.qty : 0});
    const goBackToMenu = () => {
        // cannot just use history.goBack(), the header needs to re-render to work properly
        props.history.push(`/order/${table}`);
    }
    const changeQty = (e) => {
        setItem({...item, qty: item.qty + parseInt(e.currentTarget.value)});
    }
    const addToOrder = () => {
        const orderItem = {
            ...itemData,
            ...item,
            sectionData
        }
        addToCart(orderItem);
        goBackToMenu();
    }
    const startUpdateCart = () => {
        let cartItems = [...cart];
        if (item.qty > 0) {
            cartItems[index] = {...itemData, ...item};
        } else {
            cartItems.splice(index, 1);
        }
        updateCart(cartItems);
        goBackToMenu()
    }
    // Values for button are formatted like: choiceType:choiceValue 
    // I use : as a delimitter to separate type and value so I can set the cart object 
    const renderChoices = () => {
        let choiceSections = []; 
        const choicesBuilder = (choiceType, choicesArr) => {
            let choices = [];
            for (let i = 0; i < choicesArr.length; i++) {
                choices.push(
                    <button 
                        value={`${choiceType}:${JSON.stringify(choicesArr[i])}`} 
                        key={`${i}/${choicesArr[i][language]}`}
                        onClick={selectChoice}
                    >
                        {choicesArr[i][language]}
                    </button>
                )
            }
            return choices;
        }
        //Check if item hasDrink, hasNoodle, hasSauce, etc.
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key]) {
                console.log(itemChoices)
                console.log(sectionData)
                const choices = choicesBuilder(itemChoices[key].menuKey, sectionData[itemChoices[key].menuKey]);
                choiceSections.push(<div key={`${key}`}>{choices}</div>);
            }
        }
        if (itemData.hasProteinChoice) {
            const choices = choicesBuilder("proteinChoice", itemData.proteinChoice);
            choiceSections.push(<div key={`proteinChoice`}>{choices}</div>);
        }
        if (itemData.hotPrice && itemData.coldPrice) {
            choiceSections.push(
                <div key="hotDrink">
                    <button value={`tempChoice:${JSON.stringify(sectionData.temp.hot)}`} onClick={selectChoice}>{sectionData.temp.hot[language]}</button>
                </div>
            )
            choiceSections.push(
                <div key="coldDrink">
                    <button value={`tempChoice:${JSON.stringify(sectionData.temp.cold)}`} onClick={selectChoice}>{sectionData.temp.cold[language]}</button>
                </div>
            )
        }
        return choiceSections;
    }
    const selectChoice = (e) => {
        const val = e.currentTarget.value;
        let price = itemData.price;
        if (val.indexOf("tempChoice") > -1) {
            price = val.indexOf("hot") > - 1 ? itemData.hotPrice : itemData.coldPrice;
        }
        const separatorIndex = val.indexOf(":");
        const choiceType = val.substring(0, separatorIndex);
        setItem({...item, price, [choiceType]: JSON.parse(val.substring(separatorIndex+1))});
    }
    return (
        <div>
            <button onClick={goBackToMenu}>Back</button>
            <div>
                <h1>{itemData[language]}</h1>
                <div>
                    <p>{item.qty}</p>
                    {item.qty > 0 && <button value="-1" onClick={changeQty}>-</button>}
                    <button value="1" onClick={changeQty}>+</button>
                </div>
                <div>
                    {renderChoices()}
                </div>
                <button disabled={item.qty === 0} onClick={index !== undefined ? startUpdateCart : addToOrder}>
                    {index !== undefined ? "Update Order" : `Add ${item.qty > 0 ? `${item.qty} ` : ' '}to order`}
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang,
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    updateCart: (updatedCart) => dispatch(updateCart(updatedCart))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddItem));