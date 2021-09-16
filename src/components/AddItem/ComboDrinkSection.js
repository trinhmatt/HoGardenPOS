import React, { useState, useEffect } from 'react';
import { itemChoices } from '../../static/constants/menu-constants';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import cx from 'clsx';

//Material ui imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//TO DO: Render drink options 

const ComboDrinkSection = (props) => {
    const styles = menuStyles();
    const { 
        selectedObj, 
        language,
        selectChoice, 
        drinkArr, 
        isDisabled, 
        selectedAddOns, 
        selectDrinkOption 
    } = props;

    const [state, setState] = useState({    
                                selectedIndex: -1,
                                drinkSelected: false,
                                coldSelected: false
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

    const handleDrinkSelect = (e) => {
        const index = parseInt(e.currentTarget.id.substring(0, e.currentTarget.id.indexOf("/")));
        const returnValue = state.selectedIndex === index ? "drinkChoice:null" : e.currentTarget.value;

        if (index === state.selectedIndex) {
            setState({...state, selectedIndex: -1, drinkSelected: false});
        } else {
            setState({...state, selectedIndex: index, drinkSelected: true})
        }

        selectChoice(returnValue);
    }

    const handleDrinkOptionSelect = (e) => {
       const drinkOptionType = e.currentTarget.id.substring( (e.currentTarget.id.indexOf("/")+1) );
       let drinkOption = {selectedOption: JSON.parse(e.currentTarget.value)};
       drinkOption.type = drinkOptionType;
       selectDrinkOption(drinkOption);
    }

    const renderDrinks = () => {
        let drinkElements = [];
        for (let i = 0; i < drinkArr.length; i++) {
            drinkElements.push(
                <Button
                    id={`${i}/drinkChoice`}
                    key={drinkArr[i].english}
                    disabled={isDisabled}
                    onClick={handleDrinkSelect}
                    value={`drinkChoice:${JSON.stringify(drinkArr[i])}`}
                >
                    {`${drinkArr[i].english !== "Soft Drinks" && drinkArr[i].english !== "Ice Cream" ? "Hot " : ""}${drinkArr[i][language]} ${drinkArr[i].comboHot ? `(+$${drinkArr[i].comboHot.toFixed(2)})` : ""}`}
                </Button>
            )
        }
        return drinkElements;
    }
    const renderDrinkOptions = () => {
        let optionElements = [];
        let sugarOptions = [];
        let iceOptions = [];

        if (state.selectedIndex !== -1 && drinkArr[state.selectedIndex].hasSugar) {
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
    return (
        <div className={(language === 'english') ? styles.itemChoiceLayout : styles.chinItemChoiceLayout}>
            <h2>Drink<span className={styles.red}>*</span></h2>
            {renderDrinks()}
            {state.drinkSelected && renderDrinkOptions()}
        </div>
    )
}

export default ComboDrinkSection;