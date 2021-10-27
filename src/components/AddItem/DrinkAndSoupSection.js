import React, { useState, useEffect } from 'react';
import { itemChoices, softDrinks, drinkOptionLabels } from '../../static/constants/menu-constants';

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
        selectedDrink, 
        selectedSoup,
        language,
        selectChoice, 
        drinkArr, 
        isDisabled, 
        selectedAddOns, 
        selectDrinkOption,
        isTakeout,
        hasDrink,
        hasSoup,
        clearDrinkAndSoupSelection
    } = props;

    const [state, setState] = useState({    
                                selectedIndex: {
                                    soup: -1, 
                                    drink: -1, 
                                    sugar: (selectedDrink ? selectedDrink.sugar : {english: ""}), 
                                    ice: (selectedDrink ? selectedDrink.ice : {english: ""})
                                },
                                drinkSelected: false,
                                soupSelected: false,
                                coldSelected: false,
                                selectedSide: ""
                            });

    useEffect(() => {
        if (selectedDrink && selectedSoup && state.selectedIndex.soup === -1 && state.selectedIndex.drink === -1) {
            let selectedIndex = {...state.selectedIndex};
            let coldSelected = false;
            for (let i = 0; i < drinkArr.length; i++) {
                if (drinkArr[i].english === selectedDrink.english) {
                    selectedIndex.drink = i;
                }
            }
            for (let i = 0; i < itemChoices.soup.soupChoice.length; i++) {
                if (itemChoices.soup.soupChoice[i].english === selectedSoup.english) {
                    selectedIndex.soup = i;
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
       setState({...state, selectedIndex: {...state.selectedIndex, [drinkOptionType]: drinkOption.selectedOption}})
       drinkOption.type = drinkOptionType;
       selectDrinkOption(drinkOption);
    }

    const renderChoices = (type) => {
        let elements = [];
        const typeVariables = type === "drink" ? {type, returnValKey: "drinkChoice", typeSelected: "drinkSelected"} : {type, returnValKey: "soupChoice", typeSelected: "soupSelected"};
        const choiceArray = type === "drink" ? drinkArr : itemChoices.soup.soupChoice;
        for (let i = 0; i < choiceArray.length; i++) {
            const buttonText = type === "drink" ? `${!softDrinks.includes(choiceArray[i].english) && choiceArray[i].english !== "Ice Cream" ? `${drinkOptionLabels.hot[language]} ` : ""}${choiceArray[i][language]} ${choiceArray[i].comboHot ? `(+$${choiceArray[i].comboHot.toFixed(2)})` : ""}` : choiceArray[i][language];
            elements.push(
                <Button
                    id={`${i}/${typeVariables.returnValKey}`}
                    key={choiceArray[i].english}
                    disabled={isDisabled}
                    onClick={(e) => handleSelect(e, typeVariables.type, typeVariables.returnValKey, typeVariables.typeSelected)}
                    value={`${typeVariables.returnValKey}:${JSON.stringify(choiceArray[i])}`}
                    className={language === 'english' ? 
                                    cx(styles.itemChoices,(state.selectedIndex[type] === i ? styles.selectedChoice : null)) :
                                    cx(styles.chinItemChoices,(state.selectedIndex[type] === i ? styles.chinSelectedChoice : null))}
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
        if (state.selectedIndex.drink !== -1 && drinkArr[state.selectedIndex.drink] && drinkArr[state.selectedIndex.drink].hasSugar) {
            for (let i = 0; i < itemChoices.drinkOptions.sugar.length; i++) {
                console.log(language)
                console.log(state.selectedIndex)
                sugarOptions.push(
                        <Button 
                            id={`${i}/sugar`}
                            key={`${i}/sugarOption`}
                            value={JSON.stringify(itemChoices.drinkOptions.sugar[i])}
                            onClick={handleDrinkOptionSelect}
                            className={language === 'english' ? 
                                    cx(styles.itemChoices,(state.selectedIndex.sugar && state.selectedIndex.sugar.english === itemChoices.drinkOptions.sugar[i].english ? styles.selectedChoice : null)) :
                                    cx(styles.chinItemChoices,(state.selectedIndex.sugar && state.selectedIndex.sugar.english === itemChoices.drinkOptions.sugar[i].english ? styles.chinSelectedChoice : null))}
                        >
                                {itemChoices.drinkOptions.sugar[i][language]}
                        </Button>
                );
            }
            optionElements.push(
                <div key="allSugar">
                    <h2>
                        {language === 'english' ? 
                        <span>Sugar Level</span> : <span>糖度</span>
                        }
                        <span className={styles.red}>*</span>
                    </h2>
                    <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>{sugarOptions}</ButtonGroup>
                </div>
            );
        }

        if (state.coldSelected) {
            for (let i = 0; i < itemChoices.drinkOptions.ice.length; i++) {
                iceOptions.push(
                        <Button 
                            id={`${i}/ice`}
                            key={'iceOptions'+i}
                            value={JSON.stringify(itemChoices.drinkOptions.ice[i])}
                            onClick={handleDrinkOptionSelect}
                            className={language === 'english' ? 
                                    cx(styles.itemChoices,(state.selectedIndex.ice.english === itemChoices.drinkOptions.ice[i].english ? styles.selectedChoice : null)) :
                                    cx(styles.chinItemChoices,(state.selectedIndex.ice.english === itemChoices.drinkOptions.ice[i].english ? styles.chinSelectedChoice : null))}
                        >
                            {itemChoices.drinkOptions.ice[i][language]}
                        </Button>
                );
            }
            optionElements.push(
                <div key="allIce">
                    <br />
                    <h2>
                        {language === 'english' ? 
                        <span>Ice Level</span> : <span>冰位</span>
                        }
                        <span className={styles.red}>*</span>
                    </h2>
                    <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>{iceOptions}</ButtonGroup>
                </div>
            )
        }
        return optionElements;
    }
    const selectTakeoutSide = (e) => {
        clearDrinkAndSoupSelection();
        setState({...state, selectedSide: e.currentTarget.value, selectedIndex: {...state.selectedIndex, soup: -1, drink: -1}});
    }
    return (
        <div className={(language === 'english') ? styles.itemChoiceLayout : styles.chinItemChoiceLayout}>
            {
                isTakeout && hasDrink && hasSoup ? 
                    <div>
                        <br /><br /> <br /><br />
                        <div>
                            <h2 className={styles.infoLabel}>{drinkOptionLabels.takeoutDrinkOrSoupLabel[language]}</h2>
                            <Button 
                                value={"soup"} 
                                onClick={selectTakeoutSide} 
                                variant='contained' 
                                size='small'
                                className={language === 'english' ? styles.itemChoices : styles.chinItemChoices}
                                >
                                {drinkOptionLabels.soup[language]}
                            </Button>
                            &nbsp;&nbsp;
                            <Button 
                                value={"drink"} 
                                onClick={selectTakeoutSide}
                                variant='contained' 
                                size='small'
                                className={language === 'english' ? styles.itemChoices : styles.chinItemChoices}
                                >
                                {drinkOptionLabels.drink[language]}
                            </Button>
                        </div>
                        <br /><br />
                        <div>
                        <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>
                            {state.selectedSide && state.selectedSide === "soup" && renderChoices("soup")}
                        </ButtonGroup>
                        <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>
                            {state.selectedSide && state.selectedSide === "drink" && renderChoices("drink")}
                        </ButtonGroup>
                        </div>
                    </div> 
                : 
                    <div>
                        {hasSoup && 
                            <div>
                                <h2>{drinkOptionLabels.soup[language]}<span className={styles.red}>*</span></h2>
                                <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>{renderChoices("soup")}</ButtonGroup>
                            </div>
                        }
                        <br />
                        {hasDrink && 
                            <div>
                                <h2>{drinkOptionLabels.drink[language]}<span className={styles.red}>*</span></h2>
                                <ButtonGroup variant='contained' size='small' className={styles.addItemChoices}>{renderChoices("drink")}</ButtonGroup>
                            </div>}
                    </div>
            }
            <br />
            {state.drinkSelected && 
                renderDrinkOptions()
            }
        </div>
    )
}

export default DrinkAndSoupSection;