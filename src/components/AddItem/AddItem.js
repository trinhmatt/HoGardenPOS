import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { addToCart } from '../../redux/actions/cart-actions';
import { itemChoices } from '../../static/constants/menu-constants';
import { changeLanguage } from "../../redux/actions/lang-actions";
import { updateCart } from "../../redux/actions/cart-actions";
import ItemChoiceSection from "./ItemChoiceSection";
import AddOnSection from "./AddOnSection";

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Container } from '@material-ui/core';

//Material ui icon imports
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

//Subcomponent imports
import ElevationScroll from '../subcomponents/ElevationScroll';
import { render } from '@testing-library/react';

// need to include functionality for if they want more than 1 AND the item has options
const AddItem = (props) => {
    const styles = menuStyles();
    const { itemData, table, index } = props.location.state;
    // Section data will be from the menu when adding or from itemData when editing
    const sectionData = props.location.state.sectionData ? props.location.state.sectionData : itemData.sectionData;

    const { addToCart, language, cart, updateCart } = props;
    const [item, setItem] = useState({
                                qty: itemData.qty ? itemData.qty : 0, 
                                addOn: itemData.addOn ? itemData.addOn : []
                            });
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
    const selectChoice = (choiceData) => {
        const val = choiceData;
        let price = itemData.price;

        if (val.indexOf("tempChoice") > -1) {
            price = val.indexOf("hot") > - 1 ? itemData.hotPrice : itemData.coldPrice;
        }

        const separatorIndex = val.indexOf(":");
        const choiceType = val.substring(0, separatorIndex);
        let choiceValue = null;

        if (choiceType === "addOn") {
            const returnObj = JSON.parse(val.substring(separatorIndex+1));
            choiceValue = item.addOn;
            let didChange = false;
            for (let i = 0; i < choiceValue.length; i++) {
                if (choiceValue[i].english === returnObj.english) {
                    //if no quantity, it is a add on that is on/off
                    if (choiceValue[i].qty === undefined) {
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
        }

        if (choiceValue === null && choiceData.indexOf("null") === -1) {
            choiceValue = JSON.parse(val.substring(separatorIndex+1));
        }

        setItem({...item, price, [choiceType]: choiceValue});
    }
    // Values for button are formatted like: choiceType:choiceValue 
    // I use : as a delimitter to separate type and value so I can set the cart object 
    const renderChoices = () => {
        let choiceSections = []; 
        //Check if item hasDrink, hasNoodle, hasSauce, etc.
        for (const key in itemData) {
            if (itemData[key] && itemChoices[key] && key !== "hasEgg") {
                // selectedObj is not undefined when user is editing a cart item 
                // constKey is the key used in the menu-consts 
                // choiceType = noodleChoice, sauceChoice, etc. 
                choiceSections.push(
                    <ItemChoiceSection 
                        selectedObj={itemData[itemChoices[key].menuKey]} 
                        key={key} 
                        constKey={key} 
                        language={language} 
                        selectChoice={selectChoice} 
                        choiceType={itemChoices[key].menuKey} 
                        choicesArr={sectionData[itemChoices[key].menuKey]}
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
        if (itemData.hasEgg) {
            choiceSections.push(
                <ItemChoiceSection 
                    selectedObj={itemData.eggChoice} 
                    key={"hasEgg"} 
                    constKey={"hasEgg"} 
                    language={language} 
                    selectChoice={selectChoice} 
                    choiceType={"eggChoice"} 
                    choicesArr={itemChoices.hasEgg.eggChoice}
                />);
        }
        if (sectionData.addOns && sectionData.addOns.length > 0) {
            for (let i = 0; i < sectionData.addOns.length; i++) {
                choiceSections.push(
                    <ItemChoiceSection 
                        selectedObj={itemData.addOn} 
                        key={`addOn/${i}`} 
                        constKey={"addOn"} 
                        choiceType={"addOn"} 
                        language={language} 
                        selectChoice={selectChoice} 
                        choicesArr={sectionData.addOns[i]} 
                    />);
            }
        }
        return choiceSections;
    }

    useEffect(() => {
        // Scroll to top of window on render
        window.scrollTo(0,0);
    }, []);

    return (
        <React.Fragment>
            <Container className={styles.menuLayout}>
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
                <Container className={styles.addItemLayout}>
                    {/* food item */}
                    <Paper className={styles.addItemSection} elevation={3}>
                        <h1 className={styles.itemTItle}>{itemData[language]}</h1>
                        {/* Item choices */}
                        <div>
                            {renderChoices()}
                        </div>
                        <div className={styles.row}>
                            {item.qty > 0 ?
                                <IconButton value="-1" onClick={changeQty}>
                                    <RemoveCircleIcon className={styles.addItemQtyBtn} />
                                </IconButton>
                            :
                                <IconButton value="-1" disabled onClick={changeQty}>
                                    <RemoveCircleIcon className={styles.disabledAddItemQtyBtn}/>
                                </IconButton>
                            }
                            <p>{item.qty}</p>
                            <IconButton value="1" onClick={changeQty}>
                                <AddCircleIcon className={styles.addItemQtyBtn}/>
                            </IconButton>
                        </div>
                    <Button className={styles.addToOrderBtn} variant='contained' disabled={item.qty === 0} onClick={index !== undefined ? startUpdateCart : addToOrder}>
                        {index !== undefined ? "Update Order" : `Add ${item.qty > 0 ? `${item.qty} ` : ' '}to order`}
                    </Button>
                    </Paper>
                </Container>
            </Container>
        </React.Fragment>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang,
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    addToCart: (item) => dispatch(addToCart(item)),
    changeLanguage: (lang) => dispatch(changeLanguage(lang)),
    updateCart: (updatedCart) => dispatch(updateCart(updatedCart))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddItem));