import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { itemChoices } from "../../static/constants/menu-constants";
import menuJSON from "../../static/constants/menu.json";
import { calculateItemPrice } from "../../static/helpers";
import { changeLanguage } from "../../redux/actions/lang-actions";
import {
  addToCart,
  updateCart,
  addToExistingOrder,
  updateExistingOrder,
} from "../../redux/actions/cart-actions";
import ItemChoiceSection from "./ItemChoiceSection";
import DrinkAndSoupSection from "./DrinkAndSoupSection";

//Style imports
import { menuStyles } from "../../static/css/menuStyles";
import cx from "clsx";

//Material ui imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { Container } from "@material-ui/core";
import Box from "@material-ui/core/Box";

//Material ui icon imports
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

//Subcomponent imports
import ElevationScroll from "../subcomponents/ElevationScroll";

const AddItem = (props) => {
  const styles = menuStyles();
  const { itemData, table, index, isTakeout, lastClickedElement } =
    props.location.state;

  // Section data will be from the menu when adding or from itemData when editing
  const sectionData = props.location.state.sectionData
    ? props.location.state.sectionData
    : itemData.sectionData;

  // Prop variables and functions
  const {
    addToCart,
    language,
    updateCart,
    auth,
    addToExistingOrder,
    updateExistingOrder,
    cart,
  } = props;

  // Bools that effect logic and rendering
  const isAdminUpdate = !!props.cart.orders; //if orderItems exist, it is an existing order and the admin is updating
  const isDrink = itemData.coldPrice || itemData.hotPrice;

  // Data used by component
  const [item, setItem] = useState({ ...itemData });

  const currentItem = useRef();
  currentItem.current = item;

  // Constants for add to order button text
  const engUpdateBtnText = "Update Order";
  const chinUpdateBtnText = "更新訂單";
  const engAddBtnText = `Add ${item.qty > 0 ? `${item.qty} ` : " "}to order`;
  const chinAddBtnText = `添加 ${item.qty > 0 ? `${item.qty} ` : " "}到訂單`;

  const goBackToMenu = () => {
    // cannot just use history.goBack(), the header needs to re-render to work properly
    props.history.push({
      pathname: auth.userData
        ? `/admin/place-order/${table}`
        : `/order/${table}`,
      state: { lastClickedElement },
    });
  };
  const changeQty = (e) => {
    setItem({ ...item, qty: item.qty + parseInt(e.currentTarget.value) });
  };
  const addToOrder = () => {
    const orderItem = {
      ...itemData,
      ...item,
      sectionData,
    };
    isAdminUpdate ? addToExistingOrder(orderItem) : addToCart(orderItem);
    goBackToMenu();
  };
  const startUpdateCart = () => {
    let cartItems = cart;
    if (isAdminUpdate) {
      // If admin update, need to find which order in the array this item belongs to
      if (itemData.belongsToOrder === "new") {
        for (let i = 0; i < cartItems.orderItems.length; i++) {
          if (itemData.indexInOrder === i) {
            if (item.qty > 0) {
              cartItems.orderItems[i] = { ...itemData, ...item };
            } else {
              cartItems.orderItems.splice(i, 1);
            }
          }
        }
      } else {
        for (let i = 0; i < cartItems.orders.length; i++) {
          if (itemData.belongsToOrder === cartItems.orders[i].id) {
            for (let n = 0; n < cartItems.orders[i].orderItems.length; n++) {
              if (itemData.indexInOrder === n) {
                if (item.qty > 0) {
                  cartItems.orders[i].orderItems[n] = { ...itemData, ...item };
                } else {
                  cartItems.orders[i].orderItems.splice(n, 1);
                }
              }
            }
          }
        }
      }
    } else if (item.qty > 0) {
      cartItems[index] = { ...itemData, ...item };
    } else {
      cartItems.splice(index, 1);
    }
    isAdminUpdate ? updateExistingOrder(cartItems) : updateCart(cartItems);
    goBackToMenu();
  };
  const selectChoice = (choiceData) => {
    // choiceData.currentTarget exists when it is an edit
    const val = choiceData.currentTarget
      ? choiceData.currentTarget.value
      : choiceData;
    let price = itemData.price;

    // Total price of item
    let totalPrice = item.price;

    // Have to do these separately for takeout combo
    // When drink is chosen with soup already chosen I need to remove soup and vice-versa
    let drinkChoice = currentItem.current.drinkChoice
      ? { ...currentItem.current.drinkChoice }
      : null;
    let soupChoice = currentItem.current.soupChoice
      ? { ...currentItem.current.soupChoice }
      : null;

    // For single drinks
    if (val.indexOf("tempChoice") > -1) {
      price = val.indexOf("hot") > -1 ? itemData.hotPrice : itemData.coldPrice;
    }

    const separatorIndex = val.indexOf(":");
    const choiceType = val.substring(0, separatorIndex);
    let choiceValue = "";
    const returnObj = JSON.parse(val.substring(separatorIndex + 1));

    if (choiceType === "addOn" || choiceType === "choices") {
      choiceValue = choiceType === "addOn" ? item.addOn : item.choices;
      if (choiceValue === undefined) {
        choiceValue = [];
      }
      let didChange = false;
      let selectedIce = false;
      let selectedHoney = false;
      for (let i = 0; i < choiceValue.length; i++) {
        //De select add on/choice
        if (
          choiceValue[i].english === returnObj.english ||
          (choiceValue[i].type &&
            choiceValue[i].type.indexOf("Modification") > -1 &&
            choiceValue[i].type === returnObj.type)
        ) {
          //if no quantity, it is a add on that is on/off
          if (
            choiceValue[i].qty === undefined &&
            choiceValue[i].english === returnObj.english
          ) {
            // If the add on was 'change to iced drink' and the user selected an ice level, remove ice level from drink choice
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

    // If user selected new drink and iced drink was already selected, un-select it
    let addOnCopy = item.addOn ? item.addOn : [];
    if (
      choiceType === "drinkChoice" &&
      item.addOn &&
      item.addOn.length > 0 &&
      item.drinkChoice
    ) {
      for (let i = 0; i < item.addOn.length; i++) {
        if (item.addOn[i].english === "Iced Drink") {
          addOnCopy.splice(i, 1);
        }
      }
    }

    // Update price of honey to make sure its right, since it needs to be updated if iced drink was selected and then de-selected
    if (choiceType == "addOn" && choiceValue.length > 0) {
      let icedSelected = false;
      let honeySelected = false;
      let honeyIndex = -1;
      for (let i = 0; i < choiceValue.length; i++) {
        if (choiceValue[i].english === "Iced Drink") {
          icedSelected = true;
        } else if (choiceValue[i].english === "Honey") {
          honeySelected = true;
          honeyIndex = i;
        }
      }
      if (honeySelected && !icedSelected) {
        choiceValue[honeyIndex].price = null;
      } else if (honeySelected && icedSelected) {
        let coldPrice = null;
        for (let n = 0; n < sectionData.addOns.length; n++) {
          if (sectionData.addOns[n].type.english === "Change") {
            for (let x = 0; x < sectionData.addOns[n].choices.length; x++) {
              if (sectionData.addOns[n].choices[x].english === "Honey") {
                coldPrice = sectionData.addOns[n].choices[x].coldPrice;
              }
            }
          }
        }
        choiceValue[honeyIndex].price = coldPrice;
      }
    }

    // If takeout then can only have soup OR drink
    if (isTakeout && choiceType.indexOf("drink") > -1 && soupChoice) {
      soupChoice = null;
    }
    if (isTakeout && choiceType.indexOf("soup") > -1 && drinkChoice) {
      drinkChoice = null;
    }
    setItem({
      ...item,
      price,
      drinkChoice,
      soupChoice,
      [choiceType]: choiceValue,
      addOn:
        choiceType === "drinkChoice" || choiceType === "soupChoice"
          ? addOnCopy
          : choiceType === "addOn"
          ? choiceValue
          : item.addOn,
    });
  };

  const selectDrinkOption = (optionData) => {
    const drinkObj = {
      ...item.drinkChoice,
      [optionData.type]: optionData.selectedOption,
    };
    setItem({ ...item, drinkChoice: drinkObj });
  };
  // Values for button are formatted like: choiceType:choiceValue
  // I use : as a delimitter to separate type and value so I can set the cart object
  const renderChoices = () => {
    let choiceSections = [];

    //Check if item hasNoodle, hasSauce, etc.
    for (const key in itemData) {
      // Item specific choices (protein, saunce, carb, etc)
      if (
        (itemData[key] &&
          itemChoices[key] &&
          sectionData[itemChoices[key].menuKey]) ||
        (itemChoices[key] && itemChoices[key][itemChoices[key].menuKey])
      ) {
        const choicesArr = sectionData[itemChoices[key].menuKey]
          ? sectionData[itemChoices[key].menuKey]
          : itemChoices[key][itemChoices[key].menuKey];
        choiceSections.push(
          <ItemChoiceSection
            selectedObj={itemData[itemChoices[key].menuKey]}
            key={key}
            constKey={key}
            language={language}
            selectChoice={selectChoice}
            choiceType={itemChoices[key].menuKey}
            choicesArr={choicesArr}
          />
        );
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
        />
      );
    }
    if (itemData.hotPrice && itemData.coldPrice) {
      choiceSections.push(
        <div key="hotDrink">
          <Button
            value={`tempChoice:${JSON.stringify(sectionData.temp.hot)}`}
            onClick={selectChoice}
            className={
              language === "english"
                ? cx(
                    styles.itemChoices
                    // TODO: fix select
                    // state.selectedAddOns.includes(i)
                    //   ? styles.selectedChoice
                    //   : null
                  )
                : cx(
                    styles.chinItemChoices
                    // state.selectedAddOns.includes(i)
                    //   ? styles.chinSelectedChoice
                    //   : null
                  )
            }
          >
            {sectionData.temp.hot[language]}
          </Button>
        </div>
      );
      choiceSections.push(
        <div key="coldDrink">
          <Button
            value={`tempChoice:${JSON.stringify(sectionData.temp.cold)}`}
            onClick={selectChoice}
            className={
              language === "english"
                ? cx(
                    styles.itemChoices
                    // TODO: fix select
                    // state.selectedAddOns.includes(i)
                    //   ? styles.selectedChoice
                    //   : null
                  )
                : cx(
                    styles.chinItemChoices
                    // state.selectedAddOns.includes(i)
                    //   ? styles.chinSelectedChoice
                    //   : null
                  )
            }
          >
            {sectionData.temp.cold[language]}
          </Button>
        </div>
      );
    }

    //Drinks are rendered differently, any combo can have any drink so we need to use the "drinks" obj in menu.json
    let allDrinks = [];
    for (const drinkKey in menuJSON.drinks.menuItems) {
      let drinkObj = menuJSON.drinks.menuItems[drinkKey];
      drinkObj.menuKey = drinkKey;
      allDrinks.push(drinkObj);
    }
    choiceSections.push(
      <DrinkAndSoupSection
        selectedDrink={itemData.drinkChoice}
        selectedSoup={itemData.soupChoice}
        isDisabled={isTakeout && itemData.soupChoice}
        key="comboDrink"
        language={language}
        selectChoice={selectChoice}
        drinkArr={allDrinks}
        selectedAddOns={item.addOn}
        selectDrinkOption={selectDrinkOption}
        hasDrink={itemData.hasDrink}
        hasSoup={itemData.hasSoup}
        isTakeout={isTakeout}
        clearDrinkAndSoupSelection={clearDrinkAndSoupSelection}
      />
    );

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
            updateHoneyPrice={updateHoneyPrice}
          />
        );
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
        />
      );
    }
    return choiceSections;
  };

  const checkRequiredChoices = () => {
    let allRequiredChosen = true;
    for (const key in itemData) {
      if (
        (itemData[key] &&
          itemChoices[key] &&
          !item[itemChoices[key].menuKey] &&
          !isTakeout) ||
        (key === "hasProteinChoice" && !item.selectedProtein) ||
        (key === "nChoices" &&
          item.choices &&
          itemData.nChoices !== item.choices.length) ||
        (isDrink && !item.tempChoice)
      ) {
        allRequiredChosen = false;
      }
    }
    return item.qty === 0 || !allRequiredChosen;
  };

  const clearDrinkAndSoupSelection = () => {
    setItem({ ...item, drinkChoice: null, soupChoice: null });
  };

  const updateHoneyPrice = () => {
    if (item.addOn && item.addOn.length > 0) {
      let addOnsCopy = item.addOn;
      let icedSelected = false;
      let honeySelected = false;
      let honeyIndex = -1;
      for (let i = 0; i < item.addOn.length; i++) {
        if (item.addOn[i].english === "Iced Drink") {
          icedSelected = true;
        } else if (item.addOn[i].english === "Honey") {
          honeySelected = true;
          honeyIndex = i;
        }
      }
      if (honeySelected && !icedSelected) {
        addOnsCopy[honeyIndex].price = null;
      } else if (honeySelected && icedSelected) {
        let coldPrice = null;
        for (let n = 0; n < itemData.addOns.length; n++) {
          if (itemData.addOns[n].type === "Change") {
            for (let x = 0; x < itemData.addOns[n].choices.length; x++) {
              if (itemData.addOns[n].choices[x].english === "Honey") {
                coldPrice = itemData.addOns[n].choices[x].coldPrice;
              }
            }
          }
        }
        addOnsCopy[honeyIndex].price = coldPrice;
      }
      setItem({ ...item, addOn: addOnsCopy });
    }
  };

  useEffect(() => {
    // Scroll to top of window on render
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div className={styles.addItemLayout}>
        {/* Header */}
        <ElevationScroll {...props}>
          <AppBar id="menu-header">
            <Toolbar className={styles.header}>
              <IconButton className={styles.backLayout} onClick={goBackToMenu}>
                <ArrowBackIcon className={styles.backAddItemLayout} />
              </IconButton>
              <FormGroup className={styles.switchLayout}>
                <FormControlLabel
                  control={
                    <Switch
                      size="medium"
                      checked={props.language === "chinese"}
                      onChange={() => {
                        props.language === "chinese"
                          ? props.changeLanguage("english")
                          : props.changeLanguage("chinese");
                      }}
                    />
                  }
                  label={<b className={styles.chinLanguage}>中文</b>}
                />
              </FormGroup>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Toolbar />
        <Container className={styles.addItemContainer}>
          <Box className={styles.centered} style={{ flexDirection: "column" }}>
            {/* food item */}
            <Paper className={styles.addItemSection} elevation={10}>
              <h1
                className={
                  language === "english"
                    ? styles.itemTitle
                    : styles.chinItemTitle
                }
              >
                {itemData[language]}
              </h1>
              {/* Item choices */}
              <div>{renderChoices()}</div>
              {/* Qty buttons */}
              <div className={styles.row} style={{ marginTop: "-25px" }}>
                {item.qty > 0 ? (
                  <IconButton value="-1" onClick={changeQty}>
                    <RemoveCircleIcon className={styles.addItemQtyBtn} />
                  </IconButton>
                ) : (
                  <IconButton value="-1" disabled onClick={changeQty}>
                    <RemoveCircleIcon
                      className={styles.disabledAddItemQtyBtn}
                    />
                  </IconButton>
                )}
                <p style={{ fontSize: "25px" }}>{item.qty}</p>
                <IconButton value="1" onClick={changeQty}>
                  <AddCircleIcon className={styles.addItemQtyBtn} />
                </IconButton>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
            </Paper>
            <Button
              className={
                auth.userData
                  ? styles.authAddToOrderBtn
                  : language === "english"
                  ? styles.addToOrderBtn
                  : styles.chinAddToOrderBtn
              }
              variant="contained"
              disabled={checkRequiredChoices()}
              onClick={index !== undefined ? startUpdateCart : addToOrder}
            >
              {index !== undefined
                ? language === "english"
                  ? engUpdateBtnText
                  : chinUpdateBtnText
                : language === "english"
                ? engAddBtnText
                : chinAddBtnText}
              &nbsp;(${calculateItemPrice(item).toFixed(2)})
            </Button>
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  language: state.lang.lang,
  cart: state.cart,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (item) => dispatch(addToCart(item)),
  changeLanguage: (lang) => dispatch(changeLanguage(lang)),
  updateCart: (updatedCart) => dispatch(updateCart(updatedCart)),
  addToExistingOrder: (item) => dispatch(addToExistingOrder(item)),
  updateExistingOrder: (updatedCart) =>
    dispatch(updateExistingOrder(updatedCart)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddItem)
);
