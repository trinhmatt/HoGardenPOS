import React, { useEffect, useState } from 'react';

//Material ui imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import cx from 'clsx';

//Constants imports
import { itemChoices } from '../../static/constants/menu-constants';

const ItemChoiceSection = (props) => {
    const styles = menuStyles();
    const { choiceType, choicesArr, selectChoice, language, constKey, selectedObj, maxChoices } = props;
    const isAddOn = choiceType === "addOn";
    const isSetDinner = choiceType === "choices";
    const [selectedItem, setSelectedItem] = useState(-1);
    const [selectedAddOns, setSelectedAddOns] = useState([]);
    const [qty, setQty] = useState({});

    useEffect(() => {
        // If selectedObj exists, this is an edit and we need to highlight the selected items
        if (selectedObj) {
            // If it is an addOn, the array of choices is inside choicesArr.choices 
                // else, choicesArr IS the array
            if (isAddOn || isSetDinner) {
                const allChoices = isAddOn ? choicesArr.choices : choicesArr;
                let selectedAddOns = [];
                let qty = {};
                let qtyKey = "";
                for (let i = 0; i < allChoices.length; i++) {
                    for (let n = 0; n < selectedObj.length; n++) {
                        // Check for matching choice
                        if (allChoices[i].english === selectedObj[n].english) {
                            selectedAddOns.push(i);
                            // If the add on is a qty item (# of take out cups, # of extra bowls of rice, etc.) update qty obj
                            if (selectedObj[n].qty !== undefined) {
                                qtyKey = choiceType + i.toString();
                                qty[qtyKey] = selectedObj[n].qty;
                            }
                        }
                    }
                }
                setQty(qty);
                setSelectedAddOns(selectedAddOns);
            } else {
                for (let i = 0; i < choicesArr.length; i++) {
                    if (choicesArr[i].english === selectedObj.english) {
                        setSelectedItem(i);
                    }
                }
            }
        }
    }, [])
    const handleSingleChoice = (e) => {
        const index = parseInt(e.currentTarget.id.substring(0, e.currentTarget.id.indexOf("/")));
        // if this item has been selected, unselect it
        // i check for null in the returnValue string to determine if it is a deselect vs a select
        let returnValue = selectedItem === index ? `${choiceType}:null` : e.currentTarget.value;
        if (isAddOn || isSetDinner) {
            let allSelected = selectedAddOns;

            if (allSelected.includes(index)) {
                allSelected.splice(allSelected.indexOf(index), 1);
            } else {
                returnValue = isAddOn ? returnValue.substring(0, returnValue.length-1) + `, "price": ${choicesArr.price}}` : returnValue;
                allSelected.push(index);
            }

            setSelectedAddOns(allSelected);
        } else {
            const selectedIndex = selectedItem === index ? -1 : index;
            setSelectedItem(selectedIndex);
        }
        selectChoice(returnValue);
    }
    const handleQtyChoice = (e) => {
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
            for (let i = 0; i < choicesArr.choices.length; i++) {
                const price = '$' + (choicesArr.choices[i].price ? parsePrice(choicesArr.choices[i].price.toString()) : parsePrice(choicesArr.price.toString()));

                // Add on choice can be change/extra or qty choice 
                if (choicesArr.type.english === "Change" || choicesArr.type.english === "Extra") {

                    //Save type in choice object for use later
                    choicesArr.choices[i].type = choicesArr.type.english;

                    choices.push(
                        <Button
                            id={`${i}/${choiceType}`} 
                            value={`${choiceType}:${JSON.stringify(choicesArr.choices[i])}`} 
                            key={`${i}/${choicesArr.choices[i][language]}`}
                            onClick={handleSingleChoice}
                            className={language === 'english' ? 
                                cx(styles.itemChoices,(selectedAddOns.includes(i) ? styles.selectedChoice : null)) :
                                cx(styles.chinItemChoices,(selectedAddOns.includes(i) ? styles.chinSelectedChoice : null))}
                        >
                            {choicesArr.choices[i][language]} (+{price})
                        </Button>)
                } else {
                    choices.push(
                        <div key={choicesArr.choices[i].english}>
                            <span>{choicesArr.choices[i][language]} (+{price})</span>
                            <Button 
                                value={`${choiceType}${i}:${JSON.stringify(choicesArr.choices[i])}/-1`} 
                                onClick={handleQtyChoice}
                            >
                                -
                            </Button>
                            <span>{qty[`${choiceType}${i}`] ? qty[`${choiceType}${i}`] : 0}</span>
                            <Button 
                                value={`${choiceType}${i}:${JSON.stringify(choicesArr.choices[i])}/1`} 
                                onClick={handleQtyChoice}
                            >
                                +
                            </Button>
                        </div>
                    )
                }
            }
        } else {
            for (let i = 0; i < choicesArr.length; i++) {
                choices.push(
                    <Button
                        id={`${i}/${choiceType}`}
                        disabled={isSetDinner && selectedAddOns.length === maxChoices && !selectedAddOns.includes(i)} 
                        value={`${choiceType}:${JSON.stringify(choicesArr[i])}`} 
                        key={`${i}/${choicesArr[i][language]}`}
                        onClick={handleSingleChoice}
                        className={language === 'english' ? 
                            cx(styles.itemChoices,(selectedItem === i || selectedAddOns.includes(i) ? styles.selectedChoice : null)) :
                            cx(styles.chinItemChoices,(selectedItem === i || selectedAddOns.includes(i) ? styles.chinSelectedChoice : null))}
                    >
                        {choicesArr[i][language]}
                    </Button>
                )
            }
        }
        return choices;
    }
    return (
        <div className={(language === 'english') ? styles.itemChoiceLayout : styles.chinItemChoiceLayout}>
            <h2>{isAddOn ? choicesArr.type[language] : itemChoices[constKey][language]}{<span className={styles.red}>{!isAddOn && '*'}</span>}</h2>
            <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>{choicesBuilder(choiceType, choicesArr)}</ButtonGroup>
        </div>
    )
}

export default ItemChoiceSection;