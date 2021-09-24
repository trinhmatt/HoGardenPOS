import React, { useState, useEffect } from 'react';
import { itemChoices, softDrinks } from '../../static/constants/menu-constants';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import cx from 'clsx';

//Material ui imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//TO DO: Render drink options 

const DrinkAndSoupSection = (props) => {
    const styles = menuStyles();
    const { 
        selectedObj, 
        language,
        selectChoice, 
        drinkArr, 
        isDisabled, 
        selectedAddOns, 
        selectDrinkOption,
        isTakeout,
        hasDrink,
        hasSoup 
    } = props;

    const [state, setState] = useState({    
                                selectedIndex: {soup: -1, drink: -1},
                                drinkSelected: false,
                                soupSelected: false,
                                coldSelected: false,
                                selectedSide: ""
                            });

    useEffect(() => {
        if (selectedObj) {
            let selectedIndex = -1;
            let coldSelected = false;
            for (let i = 0; i < drinkArr.length; i++) {
                if (drinkArr[i].english === selectedObj.english) {
                    selectedIndex = i;
                }
            }
            if (selectedAddOns) {
                for (let i = 0; i < selectedAddOns.length; i++) {
                    if (selectedAddOns[i].english.toLowerCase().indexOf("iced") > -1) {
                        coldSelected = true;
                    }
                }
            }
            setState({selectedIndex, drinkSelected: true, coldSelected});
        } else {
            let coldSelected = false;
            if (selectedAddOns) {
                for (let i = 0; i < selectedAddOns.length; i++) {
                    if (selectedAddOns[i].english.toLowerCase().indexOf("iced") > -1) {
                        coldSelected = true;
                    }
                }
            }
            setState({...state, coldSelected});
        }
    }, [props])

    /*
        e: event object 
        type: drink or soup 
        returnValKey: drinkChoice or soupChoice 
        typeSelected: drinkSelected or soupSelected
    */
    const handleSelect = (e, type, returnValKey, typeSelected) => {
        const index = parseInt(e.currentTarget.id.substring(0, e.currentTarget.id.indexOf("/")));
        const returnValue = state.selectedIndex[type] === index ? `${returnValKey}:null` : e.currentTarget.value;

        if (index === state.selectedIndex[type]) {
            setState({...state, selectedIndex: {...state.selectedIndex, [type]: -1}, [typeSelected]: false});
        } else {
            setState({...state, selectedIndex: {...state.selectedIndex, [type]: index}, [typeSelected]: true})
        }

        selectChoice(returnValue);
    }


    const handleDrinkOptionSelect = (e) => {
       const drinkOptionType = e.currentTarget.id.substring( (e.currentTarget.id.indexOf("/")+1) );
       let drinkOption = {selectedOption: JSON.parse(e.currentTarget.value)};
       drinkOption.type = drinkOptionType;
       selectDrinkOption(drinkOption);
    }

    const renderChoices = (type) => {
        let elements = [];
        const typeVariables = type === "drink" ? {type, returnValKey: "drinkChoice", typeSelected: "drinkSelected"} : {type, returnValKey: "soupChoice", typeSelected: "soupSelected"};
        const choiceArray = type === "drink" ? drinkArr : itemChoices.soup.soupChoice;
        for (let i = 0; i < choiceArray.length; i++) {
            const buttonText = type === "drink" ? `${!softDrinks.includes(choiceArray[i].english) && choiceArray[i].english !== "Ice Cream" ? "Hot " : ""}${choiceArray[i][language]} ${choiceArray[i].comboHot ? `(+$${choiceArray[i].comboHot.toFixed(2)})` : ""}` : choiceArray[i][language]
            elements.push(
                <Button
                    id={`${i}/${typeVariables.returnValKey}`}
                    key={choiceArray[i].english}
                    disabled={isDisabled}
                    onClick={(e) => handleSelect(e, typeVariables.type, typeVariables.returnValKey, typeVariables.typeSelected)}
                    value={`${typeVariables.returnValKey}:${JSON.stringify(choiceArray[i])}`}
                >
                    {buttonText}
                </Button>
            )
        }
        return elements;
    }

    const renderDrinkOptions = () => {
        let optionElements = [];
        let sugarOptions = [];
        let iceOptions = [];

        if (state.selectedIndex.drink !== -1 && drinkArr[state.selectedIndex.drink].hasSugar) {
            for (let i = 0; i < itemChoices.drinkOptions.sugar.length; i++) {
                sugarOptions.push(
                    <div key={`${i}/sugarOption`}>
                        <Button 
                            id={`${i}/sugar`}
                            value={JSON.stringify(itemChoices.drinkOptions.sugar[i])}
                            onClick={handleDrinkOptionSelect}
                        >
                                {itemChoices.drinkOptions.sugar[i][language]}
                        </Button>
                    </div>
                );
            }
            optionElements.push(
                <div key="allSugar">
                    <h2>Sugar Level<span className={styles.red}>*</span></h2>
                    {sugarOptions}
                </div>
            );
        }

        if (state.coldSelected) {
            for (let i = 0; i < itemChoices.drinkOptions.ice.length; i++) {
                iceOptions.push(
                    <div key={'iceOptions'+i}>
                        <Button 
                            id={`${i}/ice`}
                            value={JSON.stringify(itemChoices.drinkOptions.ice[i])}
                            onClick={handleDrinkOptionSelect}
                        >
                            {itemChoices.drinkOptions.ice[i][language]}
                        </Button>
                    </div>
                )
            }
            optionElements.push(
                <div key="allIce">
                    <h2>Ice Level<span className={styles.red}>*</span></h2>
                    {iceOptions}
                </div>
            )
        }
        return optionElements;
    }
    const selectTakeoutSide = (e) => {
        setState({...state, selectedSide: e.currentTarget.value});
    }
    return (
        <div className={(language === 'english') ? styles.itemChoiceLayout : styles.chinItemChoiceLayout}>
            {
                isTakeout && hasDrink && hasSoup ? 
                    <div>
                        <div>
                            <p>Comes with a drink OR soup</p>
                            <Button value={"soup"} onClick={selectTakeoutSide}>Soup</Button>
                            <Button value={"drink"} onClick={selectTakeoutSide}>Drink</Button>
                        </div>
                        <div>
                            {state.selectedSide && state.selectedSide === "soup" && renderChoices("soup")}
                            {state.selectedSide && state.selectedSide === "drink" && renderChoices("drink")}
                        </div>
                    </div> 
                : 
                    <div>
                        {hasSoup && <div><h2>Soup<span className={styles.red}>*</span></h2>{renderChoices("soup")}</div>}
                        {hasDrink && <div><h2>Drink<span className={styles.red}>*</span></h2>{renderChoices("drink")}</div>}
                    </div>
            }
            
            {state.drinkSelected && renderDrinkOptions()}
        </div>
    )
}

export default DrinkAndSoupSection;