import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'; 
import { withRouter } from 'react-router';

import MenuSectionItem from "./MenuSectionItem";
import { itemChoices } from "../../static/constants/menu-constants";

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';

const MenuSection = (props) => {
    const styles = menuStyles();
    const ref = useRef(null);
    const { data, language, cart } = props;
    const [items, setItems] = useState([]);
    const [itemElements, setItemElements] = useState([]);

    // on mount, set items
    useEffect(() => {
        let items = {};
        for (const item in data.menuItems) {
            items[item] = {
                ...data.menuItems[item],
                qty: 0
            }
        }
        setItems(items);
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // on item change or language change, (re)render item list
    useEffect(() => {
        let elements = [];
        let itemQtyObjs = {};
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].sectionData.title.english === data.title.english) {
                const itemQtyKey = cart[i].english.replace(" ", "")
                if (itemQtyObjs[itemQtyKey]) {
                    itemQtyObjs[itemQtyKey] += cart[i].qty;
                } else {
                    itemQtyObjs[itemQtyKey] = cart[i].qty;
                }
            }
        }
        if (Object.keys(items).length > 0) {
            let sectionData = {...data};
            delete sectionData.menuItems;
            for (const item in items) {
                const qtyQueryKey = items[item].english.replace(" ", "");
                const qty = itemQtyObjs[qtyQueryKey] ? itemQtyObjs[qtyQueryKey] : 0;
                elements.push(
                    <MenuSectionItem qty={qty} sectionData={sectionData} table={props.match.params.number} language={language} key={item} data={items[item]} />
                )
            }
            setItemElements(elements)
        }
    }, [items, language, cart]) // eslint-disable-line react-hooks/exhaustive-deps

    // This needs to run after itemElements is set so that getBoundingClientRect() returns the correct position of the parent
    useEffect(() => {
        if (!!ref.current.getBoundingClientRect().y && itemElements.length > 0) {
            props.returnTopPosition(ref.current.getBoundingClientRect().y, data.title[language])
        }
    }, [itemElements]) // eslint-disable-line react-hooks/exhaustive-deps

    const renderExtraInfo = () => {
        let extraInfoElements = [];
        if (data.extraInfo && data.extraInfo.length > 0) {
            for (let i = 0; i < data.extraInfo.length; i++) {
                extraInfoElements.push(
                    <p key={data.extraInfo[i][language]} className={styles.menuExtraInfo}>{data.extraInfo[i][language]}</p>
                )
            }
        }
        return extraInfoElements;
    }
    return (
        <Paper className={styles.menuSection} elevation={3} ref={ref}>
            <h1 className={styles.menuSectionTitle}>{data.title[language]}</h1>
            <div className={styles.centered} style={{textAlign: 'center', flexDirection: 'column'}}>{renderExtraInfo()}</div>
                {itemElements}
        </Paper>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang,
    cart: state.cart
})

export default withRouter(connect(mapStateToProps)(MenuSection));