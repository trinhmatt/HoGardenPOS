import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { menuStyles } from '../../static/css/menuStyles';
import { itemChoices } from '../../static/constants/menu-constants';

const ItemChoiceSection = (props) => {
    const styles = menuStyles();
    const { choiceType, choicesArr, selectChoice, language, constKey } = props;
    const isAddOn = choiceType === "addOn";
    const [selectedItem, setSelectedItem] = useState(-1);
    const [qty, setQty] = useState({});

    const handleSingleChoice = (e) => {
        const index = parseInt(e.currentTarget.id.charAt(0));
        let returnValue = e.currentTarget.value;
        if (isAddOn) {
            returnValue = returnValue.substring(0, returnValue.length-1) + `, "price": ${choicesArr.price}}`
        }
        console.log(returnValue);
        selectChoice(returnValue);
        setSelectedItem(index);
    }
    const handleQtyChoice = (e) => {
        let value = e.currentTarget.value;

        const qtyObjKey = value.substring(0, value.indexOf(":"));
        value = value.substring(value.indexOf(":")+1);
        const endOfObj = value.indexOf("/", value.indexOf("}"));
        const incrementNumber = parseInt(value.substring(endOfObj+1));
        const newQty = qty[qtyObjKey] ? qty[qtyObjKey] + incrementNumber : incrementNumber;
        const returnValue = `${choiceType}:` + value.substring(0, endOfObj-1) + `, "qty": ${newQty}, "price": ${choicesArr.price}}`;

        selectChoice(returnValue);
        setQty({...qty, [qtyObjKey]: newQty});
    }
    const parsePrice = (price) => {
        if (price.indexOf(".") === -1) {
            price += ".00";
        } else if (price.indexOf(".") === price.length-2) {
            price += "0";
        }
        return price;
    }
    const choicesBuilder = (choiceType, choicesArr) => {
        let choices = [];
        if (isAddOn) {
            console.log(choicesArr)
            /*
                If this section is for an add on, there is different logic that occurs 
                There are 3 add on types:
                    - Change
                    - Extra
                    - Add
                Change and Extra have the same behaviour, meaning that the customer can either make a selection or not 
                Add means that they can add the add on a number of times 
                    - Like add bowls of rice, or add extra fried eggs 
                    - If the type is Add, I added some things to the Button values that I use to determine what they are adding and if they are removing or adding to the qty
                    - I added the index of the choice before the ":" which I use to determine which choice the user is incrementing/decrementing
                    - I added "/-1" or "/1" at the end for the decrement/increment values 
                    - Both ":" and "/" are used as delimitters so I know where in the string to look for the information I need (qty and increment/decrement)
            */
            for (let i = 0; i < choicesArr.choices.length; i++) {
                const price = parsePrice(choicesArr.price.toString());
                if (choicesArr.type.english === "Change" || choicesArr.type.english === "Extra") {
                    choices.push(
                        <Button
                            id={`${i}/${choiceType}`} 
                            value={`${choiceType}:${JSON.stringify(choicesArr.choices[i])}`} 
                            key={`${i}/${choicesArr.choices[i][language]}`}
                            onClick={handleSingleChoice}
                            className={styles.itemChoices,(selectedItem === i ? styles.selectedChoice : null)}
                        >
                            {choicesArr.choices[i][language]} (+{price})
                        </Button>)
                } else {
                    choices.push(
                        <div>
                            <span>{choicesArr.choices[i][language]} (+{price})</span>
                            <Button value={`${choiceType}${i}:${JSON.stringify(choicesArr.choices[i])}/-1`} onClick={handleQtyChoice}>-</Button>
                            <span>{qty[`${choiceType}${i}`] ? qty[`${choiceType}${i}`] : 0}</span>
                            <Button value={`${choiceType}${i}:${JSON.stringify(choicesArr.choices[i])}/1`} onClick={handleQtyChoice}>+</Button>
                        </div>
                    )
                }
            }
        } else {
            for (let i = 0; i < choicesArr.length; i++) {
                choices.push(
                    <Button
                        id={`${i}/${choiceType}`} 
                        value={`${choiceType}:${JSON.stringify(choicesArr[i])}`} 
                        key={`${i}/${choicesArr[i][language]}`}
                        onClick={handleSingleChoice}
                        className={styles.itemChoices,(selectedItem === i ? styles.selectedChoice : null)}
                    >
                        {choicesArr[i][language]}
                    </Button>
                )
            }
        }
        return choices;
    }
    return (
        <div>
            <h2>{isAddOn ? choicesArr.type[language]: itemChoices[constKey][language]}</h2>
            <ButtonGroup variant='contained'>{choicesBuilder(choiceType, choicesArr)}</ButtonGroup>
        </div>
    )
}

export default ItemChoiceSection;