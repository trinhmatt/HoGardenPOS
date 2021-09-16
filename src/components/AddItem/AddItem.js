import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { itemChoices } from '../../static/constants/menu-constants';
import menuJSON from '../../static/constants/menu.json';
import { changeLanguage } from "../../redux/actions/lang-actions";
import { addToCart, updateCart, addToExistingOrder, updateExistingOrder } from "../../redux/actions/cart-actions";
import ItemChoiceSection from "./ItemChoiceSection";
import ComboDrinkSection from './ComboDrinkSection';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import Box from '@material-ui/core/Box';

//Material ui icon imports
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Subcomponent imports
import ElevationScroll from '../subcomponents/ElevationScroll';

const AddItem = (props) => {
    const styles = menuStyles();
    const { itemData, table, index } = props.location.state;

    // Section data will be from the menu when adding or from itemData when editing
    const sectionData = props.location.state.sectionData ? props.location.state.sectionData : itemData.sectionData;

    // Prop variables and functions 
    const { 
        addToCart, 
        language, 
        updateCart, 
        auth, 
        addToExistingOrder, 
        updateExistingOrder } = props;
    
    // Bools that effect logic and rendering
    const isAdminUpdate = !!props.cart.orderItems; //if orderItems exist, it is an existing order and the admin is updating  
    const isTakeout = props.location.pathname.indexOf("takeout") > -1;

    // Data used by component
    const cart = isAdminUpdate ? props.cart.orderItems : props.cart;
    const [item, setItem] = useState({...itemData});

    // Constants for add to order button text
    const engUpdateBtnText = "Update Order";
    const chinUpdateBtnText = "更新訂單";
    const engAddBtnText = `Add ${item.qty > 0 ? `${item.qty} ` : ' '}to order`;
    const chinAddBtnText = `添加 ${item.qty > 0 ? `${item.qty} ` : ' '}到訂單`;
    
    const goBackToMenu = () => {
        // cannot just use history.goBack(), the header needs to re-render to work properly
        props.history.push((auth.userData ? `/admin/place-order/${table}` : `/order/${table}`));
    }
    const changeQty = (e) => {
        setItem({ ...item, qty: item.qty + parseInt(e.currentTarget.value) });
    }
    const addToOrder = () => {
        const orderItem = {
            ...itemData,
            ...item,
            sectionData
        }
        isAdminUpdate ? addToExistingOrder(orderItem) : addToCart(orderItem);
        goBackToMenu();
    }
    const startUpdateCart = () => {
        let cartItems = [...cart];
        if (item.qty > 0) {
            cartItems[index] = { ...itemData, ...item };
        } else {
            cartItems.splice(index, 1);
        }
        isAdminUpdate ? updateExistingOrder(cartItems) : updateCart(cartItems);
        goBackToMenu();
    }
    const selectChoice = (choiceData) => {
        const val = choiceData.currentTarget ? choiceData.currentTarget.value : choiceData;
        let price = itemData.price;
        let drinkChoice = item.drinkChoice ? {...item.drinkChoice} : null;

        if (val.indexOf("tempChoice") > -1) {
            price = val.indexOf("hot") > - 1 ? itemData.hotPrice : itemData.coldPrice;
        }

        const separatorIndex = val.indexOf(":");
        const choiceType = val.substring(0, separatorIndex);
        let choiceValue = "";
        const returnObj = JSON.parse(val.substring(separatorIndex+1));

        if (choiceType === "addOn" || choiceType === "choices") {
            choiceValue = choiceType === "addOn" ? item.addOn : item.choices;
            if (choiceValue === undefined) {
                choiceValue = [];
            }
            let didChange = false;
            for (let i = 0; i < choiceValue.length; i++) {
                if (choiceValue[i].english === returnObj.english) {
                    //if no quantity, it is a add on that is on/off
                    if (choiceValue[i].qty === undefined) {

                        // If the add on was 'change to iced drink' and the user selected an ice level, remove it
                        if (choiceValue[i].english === "Iced Drink" && drinkChoice) {
                            drinkChoice.ice = null;
                        }

                        choiceValue.splice(i, 1);
                    } else {
                        choiceValue[i] = returnObj;
                    }
                    didChange = true;
                }
            }
            if (!didChange) {
                choiceValue.push(returnObj);
            }
        } else if (val.indexOf("null") === -1) {
            choiceValue = returnObj;
        }

        let addOnCopy = item.addOn;
        if (choiceType === "drinkChoice" && item.addOn && item.addOn.length > 0) {
            for (let i = 0; i < item.addOn.length; i++) {
                if (item.addOn[i].english === "Iced Drink") {
                    addOnCopy.splice(i, 1);
                }
            }
        }
        setItem({ 
            ...item,
             price, 
             drinkChoice, 
             [choiceType]: choiceValue, 
             addOn: (choiceType === "drinkChoice" ? addOnCopy : choiceType === "addOn" ? choiceValue : item.addOn) 
        });
    }
    const selectDrinkOption = (optionData) => {
        const drinkObj = { ...item.drinkChoice, [optionData.type]: optionData.selectedOption };
        setItem({...item, drinkChoice: drinkObj});
    }
    // Values for button are formatted like: choiceType:choiceValue 
    // I use : as a delimitter to separate type and value so I can set the cart object 
    const renderChoices = () => {
        let choiceSections = [];

        //Check if item hasNoodle, hasSauce, etc.
        for (const key in itemData) {
            // Item specific choices (protein, saunce, carb, etc)
            if (( itemData[key] && itemChoices[key] && sectionData[itemChoices[key].menuKey]) || (itemChoices[key] && itemChoices[key][itemChoices[key].menuKey])) {
                const choicesArr = sectionData[itemChoices[key].menuKey] ? sectionData[itemChoices[key].menuKey] : itemChoices[key][itemChoices[key].menuKey];
                choiceSections.push(
                    <ItemChoiceSection 
                        selectedObj={itemData[itemChoices[key].menuKey]} 
                        key={key} 
                        constKey={key} 
                        language={language} 
                        selectChoice={selectChoice} 
                        choiceType={itemChoices[key].menuKey} 
                        choicesArr={choicesArr}
                    />);
            } 
        }
        if (itemData.hasProteinChoice) {
            choiceSections.push(
                <ItemChoiceSection 
                    selectedObj={itemData.selectedProtein} 
                    key={"proteinChoice"} 
                    constKey={"hasProtein"} 
                    language={language} 
                    selectChoice={selectChoice} 
                    choiceType={"selectedProtein"} 
                    choicesArr={itemData.proteinChoice}
                />);
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
        //Drinks are rendered differently, any combo can have any drink so we need to use the "drinks" obj in menu.json 
        if (itemData.hasDrink) {
            let allDrinks = [];
            for (const drinkKey in menuJSON.drinks.menuItems) {
                let drinkObj = menuJSON.drinks.menuItems[drinkKey];
                drinkObj.menuKey = drinkKey;
                allDrinks.push(drinkObj);
            }
            choiceSections.push(
                <ComboDrinkSection 
                    selectedObj={itemData.drinkChoice}
                    isDisabled={(isTakeout && itemData.soupChoice)}
                    key="comboDrink"
                    language={language}
                    selectChoice={selectChoice}
                    drinkArr={allDrinks}
                    selectedAddOns={item.addOn}
                    selectDrinkOption={selectDrinkOption}
                />);
        }
        if (sectionData.addOns && sectionData.addOns.length > 0) {
            for (let i = 0; i < sectionData.addOns.length; i++) {
                choiceSections.push(
                    <ItemChoiceSection 
                        drinkChoice={item.drinkChoice}
                        selectedObj={itemData.addOn} 
                        key={`addOn/${i}`} 
                        constKey={"addOn"} 
                        choiceType={"addOn"} 
                        language={language} 
                        selectChoice={selectChoice} 
                        choicesArr={sectionData.addOns[i]} 
                        addOns={item.addOn}
                    />);
            }
        }
        // set dinner choices 
        if (itemData.nChoices !== undefined) {
            choiceSections.push(
                <ItemChoiceSection
                    selectedObj={itemData.choices}
                    key={`choices`}
                    constKey={"choices"}
                    choiceType={"choices"}
                    maxChoices={item.maxChoices}
                    language={language}
                    selectChoice={selectChoice}
                    choicesArr={sectionData.choices}
                />)
        }
        return choiceSections;
    }

    const checkRequiredChoices = () => {
        let allRequiredChosen = true;
        for (const key in itemData) {
            if (
                (itemData[key] && itemChoices[key] && !item[itemChoices[key].menuKey]) || 
                (key === "hasProteinChoice" && !item.selectedProtein) || 
                (key === "nChoices" && itemData.nChoices !== item.choices.length)
            ) {
                allRequiredChosen = false;
            } 
        }
        return item.qty === 0 || !allRequiredChosen;
    }

    useEffect(() => {
        // Scroll to top of window on render
        window.scrollTo(0, 0);
    }, []);

    return (
        <React.Fragment>
            <Container container spacing={0} className={styles.addItemLayout}>
                {/* Header */}
                <ElevationScroll {...props}>
                    <AppBar id='menu-header'>
                        <Toolbar className={styles.header}>
                            <IconButton className={styles.backLayout} onClick={goBackToMenu}>
                                <ArrowBackIcon className={styles.backAddItemLayout} />
                            </IconButton>
                            <FormGroup className={styles.switchLayout}>
                                <FormControlLabel
                                    className={styles.switchAddItemLayout}
                                    control={<Switch size="medium" checked={props.language === "chinese"} onChange={() => {
                                        (props.language === "chinese") ?
                                            props.changeLanguage("english") : props.changeLanguage("chinese")
                                    }
                                    }
                                    />}
                                    label={<b className={styles.chinLanguage}>中文</b>}
                                />
                            </FormGroup>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar />
                <Container className={styles.addItemContainer}>
                    <Box className={styles.centered} style={{flexDirection: 'column'}}>
                        {/* food item */}
                        <Paper className={styles.addItemSection} elevation={10}>
                            <h1 className={(language === 'english') ? styles.itemTitle : styles.chinItemTitle}>{itemData[language]}</h1>
                            {/* Item choices */}
                            <div>
                                {renderChoices()}
                            </div>
                            <div className={styles.row} style={{marginTop: '-25px'}}>
                                {item.qty > 0 ?
                                    <IconButton value="-1" onClick={changeQty}>
                                        <RemoveCircleIcon className={styles.addItemQtyBtn} />
                                    </IconButton>
                                    :
                                    <IconButton value="-1" disabled onClick={changeQty}>
                                        <RemoveCircleIcon className={styles.disabledAddItemQtyBtn} />
                                    </IconButton>
                                }
                                <p style={{fontSize: '25px'}}>{item.qty}</p>
                                <IconButton value="1" onClick={changeQty}>
                                    <AddCircleIcon className={styles.addItemQtyBtn} />
                                </IconButton>
                            </div>
                            <br /><br /><br /><br /><br />
                        </Paper>
                        <Button
                            className={ auth.userData ? styles.authAddToOrderBtn : language === 'english' ? styles.addToOrderBtn : styles.chinAddToOrderBtn}
                            variant='contained' 
                            disabled={checkRequiredChoices()} 
                            onClick={index !== undefined ? startUpdateCart : addToOrder}>
                            {
                            index !== undefined ? 
                                (language === 'english' ? engUpdateBtnText : chinUpdateBtnText)
                                : 
                                (language === 'english' ? engAddBtnText : chinAddBtnText)
                            }
                        </Button>
                    </Box>
                </Container>
            </Container>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang,
    cart: state.cart,
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    changeLanguage: (lang) => dispatch(changeLanguage(lang)),
    updateCart: (updatedCart) => dispatch(updateCart(updatedCart)),
    addToExistingOrder: item => dispatch(addToExistingOrder(item)),
    updateExistingOrder: updatedCart => dispatch(updateExistingOrder(updatedCart))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddItem));