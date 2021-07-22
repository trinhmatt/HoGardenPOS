import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions/cart-actions';
import { itemChoices } from '../constants/menu-constants';

// need to include functionality for if they want more than 1 AND the item has options
const AddItem = (props) => {
    const { itemData, table, sectionData } = props.location.state;
    const { addToCart, language } = props;
    const [item, setItem] = useState({qty: 0});
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
            ...item
        }
        addToCart(orderItem);
        goBackToMenu();
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
                const choices = choicesBuilder(itemChoices[key], sectionData[itemChoices[key]]);
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
        let price = item.price;
        if (val.indexOf("tempChoice") > -1) {
            price = val.indexOf("hot") > - 1 ? itemData.hotPrice : itemData.coldPrice;
        }
        const separatorIndex = val.indexOf(":");
        const choiceType = val.substring(0, separatorIndex)
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
                <button disabled={item.qty === 0} onClick={addToOrder}>{`Add ${item.qty > 0 ? `${item.qty} ` : ' '}to order`}</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddItem));