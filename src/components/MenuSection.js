import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux'; 
import { withRouter } from 'react-router';

import MenuSectionItem from "./MenuSectionItem";
import { itemChoices } from "../constants/menu-constants";

const MenuSection = (props) => {
    const ref = useRef(null);
    const { data, language } = props;
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
        if (Object.keys(items).length > 0) {
            let sectionData = {...data};
            delete sectionData.menuItems;
            for (const item in items) {
                elements.push(
                    <MenuSectionItem sectionData={sectionData} table={props.match.params.number} language={language} key={item} data={items[item]} />
                )
            }
            setItemElements(elements)
        }
    }, [items, language]) // eslint-disable-line react-hooks/exhaustive-deps

    // This needs to run after itemElements is set so that getBoundingClientRect() returns the correct position of the parent
    useEffect(() => {
        if (!!ref.current.getBoundingClientRect().y && itemElements.length > 0) {
            props.returnTopPosition(ref.current.getBoundingClientRect().y, data.title[language])
        }
    }, [itemElements]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div ref={ref}>
            <h1>{data.title[language]}</h1>
            <div>
                {itemElements}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang
})

export default withRouter(connect(mapStateToProps)(MenuSection));