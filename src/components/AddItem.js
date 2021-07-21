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
    const renderChoices = () => {
        let choiceSections = []; 

        //Check if item hasDrink, hasNoodle, hasSauce, etc.
        for (const key in itemData) {
            if (itemChoices[key]) {

                // If it does, create a section using the data in the section object
                let choices = [];
                for (let i = 0; i < sectionData[itemChoices[key]].length; i++) {
                    // Button value = chinese/english values for item to send to kitchen
                    choices.push(
                        <button 
                            value={`${itemChoices[key]}:${JSON.stringify(sectionData[itemChoices[key]][i])}`} 
                            key={`${i}/${sectionData[itemChoices[key]][i][language]}`}
                            onClick={selectChoice}
                        >
                            {sectionData[itemChoices[key]][i][language]}
                        </button>
                    );
                }
                choiceSections.push(<div key={`${key}`}>{choices}</div>);
            }
        }
        if (itemData.hasProteinChoice) {
            let choices = [];
            for (let i = 0; i < itemData.proteinChoice.length; i++) {
                // Button value = chinese/english values for item to send to kitchen
                choices.push(
                    <button 
                        value={`proteinChoice:${JSON.stringify(itemData.proteinChoice[i])}`} 
                        key={`${i}/${itemData.proteinChoice[i][language]}`}
                        onClick={selectChoice}
                    >
                        {itemData.proteinChoice[i][language]}
                    </button>
                );
            }
            choiceSections.push(<div key={`proteinChoice`}>{choices}</div>);
        }
        return choiceSections;
    }
    const selectChoice = (e) => {
        const val = e.currentTarget.value;
        console.log(val)
        const separatorIndex = val.indexOf(":");
        const choiceType = val.substring(0, separatorIndex)
        console.log(val.substring(separatorIndex+1))

        setItem({...item, [choiceType]: JSON.parse(val.substring(separatorIndex+1))});
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
                <button disabled={item.qty === 0} onClick={addToOrder}>Add to order</button>
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