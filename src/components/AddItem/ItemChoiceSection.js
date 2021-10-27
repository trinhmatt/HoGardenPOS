import React, { useEffect, useState, useRef } from 'react';

//Material ui imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import cx from 'clsx';

//Material ui imports
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Constants imports
import { itemChoices, softDrinks } from '../../static/constants/menu-constants';

const ItemChoiceSection = (props) => {
    const styles = menuStyles();
    const { choiceType, choicesArr, selectChoice, language, constKey, selectedObj, maxChoices, drinkChoice, addOns, updateHoneyPrice } = props;
    const isAddOn = choiceType === "addOn";
    const isSetDinner = choiceType === "choices";
    const isModification = isAddOn && choicesArr.type && choicesArr.type.english.indexOf("Modification") > -1;
    const [state, setState] = useState({
        selectedItem: -1,
        selectedAddOns: [],
        qty: {},
        choiceElements: []
    });

    // Need these for drink options 
    // I only want the "Iced Drink" add on to reset if the new drinkChoice !== prevDrinkChoice
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
    };

    const prevDrinkChoice = usePrevious(drinkChoice);
    
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
                setState({...state, qty, selectedAddOns})
            } else {
                for (let i = 0; i < choicesArr.length; i++) {
                    if (choicesArr[i].english === selectedObj.english) {
                        setState({...state, selectedItem: i});
                    }
                }
            }
        } 
    }, [])
    useEffect(() => {
        if (drinkChoice && prevDrinkChoice && state.selectedAddOns.length > 0 && prevDrinkChoice.english !== drinkChoice.english) {
            let selectedAddOnsCopy = state.selectedAddOns;
            for (let i = 0; i < state.selectedAddOns.length; i++) {
                if (choicesArr.choices[state.selectedAddOns[i]].english === "Iced Drink" && !drinkChoice.ice) {
                    selectedAddOnsCopy.splice(i, 1);
                    setState({...state, selectedAddOns: selectedAddOnsCopy});
                }
            }
        }
    }, [drinkChoice])
    // useEffect(() => {
    //     console.log("prev", prevState)
    //     console.log("curr", state)
    //     if (
    //         state.choiceElements.length === 0  // initial render
    //         // need the following two checks to re-render the price for iced drink add on since not all drink have the same iced drink price
    //         || (prevDrinkChoice && drinkChoice.english !== prevDrinkChoice.english) // if new selection and drink was already selected
    //         || (!prevDrinkChoice && drinkChoice && drinkChoice.english) // if new selection and no drink already selected
    //         || (prevState.selectedItem !== state.selectedItem)
    //         || (prevState.selectedAddOns.length !== state.selectedAddOns.length)
    //         || (prevState.qty !== state.qty)
    //     ) {
    //         choicesBuilder(choiceType, choicesArr);
    //     }
    // });
    const handleSingleChoice = (e) => {
        const index = parseInt(e.currentTarget.id.substring(0, e.currentTarget.id.indexOf("/")));
        // if this item has been selected, unselect it
        // i check for null in the returnValue string to determine if it is a deselect vs a select
        let returnValue = state.selectedItem === index ? `${choiceType}:null` : e.currentTarget.value;
        if (isAddOn || isSetDinner) {
            let allSelected = state.selectedAddOns;

            if (allSelected.includes(index)) {
                allSelected.splice(allSelected.indexOf(index), 1);
            } else if (isModification) {
                allSelected = [index];
            } else {
                returnValue = isAddOn && returnValue.indexOf("price") === -1 && choicesArr.price ? returnValue.substring(0, returnValue.length-1) + `, "price": ${choicesArr.price}}` : returnValue;
                allSelected.push(index);
            }
            setState({...state, selectedAddOns: allSelected});
        } else {
            const selectedIndex = state.selectedItem === index ? -1 : index;
            setState({...state, selectedItem: selectedIndex});
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
        const newQty = state.qty[qtyObjKey] ? state.qty[qtyObjKey] + incrementNumber : incrementNumber;
        const returnValue = `${choiceType}:` + value.substring(0, endOfObj-1) + `, "qty": ${newQty}, "price": ${choicesArr.price}}`;

        selectChoice(returnValue);
        setState({...state, qty: {...state.qty, [qtyObjKey]: newQty}})
    }
    const parsePrice = (price) => {
        if (price) {
            if (price.indexOf(".") === -1) {
                price += ".00";
            } else if (price.indexOf(".") === price.length-2) {
                price += "0";
            }
        }
        return price;
    }
    const choicesBuilder = (choiceType, choicesArr) => {
        let choiceElements = [];
        if (isAddOn) {
            for (let i = 0; i < choicesArr.choices.length; i++) {
                let price = '';

                // If the addOn is an iced drink, the price changes based on what drink it is 
                if (choicesArr.choices[i].price || choicesArr.price) {
                    price = '$';

                    if (choicesArr.choices[i].english === "Iced Drink") {
                        choicesArr.choices[i].price = drinkChoice && drinkChoice.comboCold ? drinkChoice.comboCold-drinkChoice.comboHot : 1.50;
                    } else if (choicesArr.choices[i].english === "Honey") {
                        //if addons, check if iced drink selected to change price to cold price
                        if (addOns && addOns.length > 0) {
                            let choseIced = false;
                            let choseHoney = false;
                            for (let n = 0; n < addOns.length; n++) {
                                if (addOns[n].english === "Iced Drink") {
                                    choicesArr.choices[i].price = choicesArr.choices[i].coldPrice;
                                    choseIced = true;
                                } else if (addOns[n].english === "Honey") {
                                    choseHoney = true;
                                }
                            }
                            if (choseHoney && !choseIced || !choseHoney && !choseIced) {
                                choicesArr.choices[i].price = null;
                            }
                        // else, reset price value so that app defaults to choicesArr.price 
                        } else {
                            choicesArr.choices[i].price = null;
                        }
                    }
                    
                    if (choicesArr.choices[i].price) {
                        price += parsePrice(choicesArr.choices[i].price.toString());
                    } 
                    else {
                        price += parsePrice(choicesArr.price.toString());
                    }
                }
                
                // Add on choice can be change/extra or qty choice 
                if (choicesArr.type.english !== "Add") {

                    // This logic is just to not render the add on if it is an iced drink and if the drink is ice cream or soft drink
                    if ( 
                        !drinkChoice 
                        || ((softDrinks.includes(drinkChoice.english) || drinkChoice.english === "Ice Cream") && choicesArr.choices[i].english !== "Iced Drink") 
                        || (!softDrinks.includes(drinkChoice.english) && drinkChoice.english !== "Ice Cream")
                    ) {
                        //Save type in choice object for use later
                        choicesArr.choices[i].type = choicesArr.type.english;
                        choiceElements.push(
                            <Button
                                id={`${i}/${choiceType}`} 
                                value={`${choiceType}:${JSON.stringify(choicesArr.choices[i])}`} 
                                key={`${i}/${choicesArr.choices[i][language]}`}
                                onClick={handleSingleChoice}
                                className={language === 'english' ? 
                                    cx(styles.itemChoices,(state.selectedAddOns.includes(i) ? styles.selectedChoice : null)) :
                                    cx(styles.chinItemChoices,(state.selectedAddOns.includes(i) ? styles.chinSelectedChoice : null))}
                            >
                                {choicesArr.choices[i][language]} {price.length > 0 ? `(+${price})` : ""}
                            </Button>)
                    }
                    
                } else {
                    choiceElements.push(
                        <div key={choicesArr.choices[i].english}>
                            <span className={language === 'english' ? styles.addOnText : styles.chinAddOnText}>{choicesArr.choices[i][language]} (+{price})</span>
                            {state.qty.addOn0 > 0 ?
                                    <IconButton value={`${choiceType}${i}:${JSON.stringify(choicesArr.choices[i])}/-1`} onClick={handleQtyChoice}>
                                        <RemoveCircleIcon className={styles.addOnQtyBtn} />
                                    </IconButton>
                                    :
                                    <IconButton value="-1" disabled onClick={handleQtyChoice}>
                                        <RemoveCircleIcon className={styles.disabledAddOnQtyBtn} />
                                    </IconButton>
                            }
                            <span className={language === 'english' ? styles.addOnText : styles.chinAddOnText}>{state.qty[`${choiceType}${i}`] ? state.qty[`${choiceType}${i}`] : 0}</span>
                            <IconButton value={`${choiceType}${i}:${JSON.stringify(choicesArr.choices[i])}/1`} onClick={handleQtyChoice}>
                                <AddCircleIcon className={styles.addOnQtyBtn} />
                            </IconButton>
                        </div>
                    )
                }
            }
        } else if (choicesArr) {
            for (let i = 0; i < choicesArr.length; i++) {
                choiceElements.push(
                    <Button
                        id={`${i}/${choiceType}`}
                        disabled={isSetDinner && state.selectedAddOns.length === maxChoices && !state.selectedAddOns.includes(i)} 
                        value={`${choiceType}:${JSON.stringify(choicesArr[i])}`} 
                        key={`${i}/${choicesArr[i][language]}`}
                        onClick={handleSingleChoice}
                        className={language === 'english' ? 
                            cx(styles.itemChoices,(state.selectedItem === i || state.selectedAddOns.includes(i) ? styles.selectedChoice : null)) :
                            cx(styles.chinItemChoices,(state.selectedItem === i || state.selectedAddOns.includes(i) ? styles.chinSelectedChoice : null))}
                    >
                        {choicesArr[i][language]}
                    </Button>
                )
            }
        }
        return choiceElements
        //setState({...state, choiceElements});
    }
    
    return (
        <div className={(language === 'english') ? styles.itemChoiceLayout : styles.chinItemChoiceLayout}>
            <h2>{isAddOn ? choicesArr.type[language] : itemChoices[constKey][language]}{<span className={styles.red}>{!isAddOn && '*'}</span>}</h2>
            <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>{choicesBuilder(choiceType, choicesArr)}</ButtonGroup>
        </div>
    )
}

export default ItemChoiceSection;