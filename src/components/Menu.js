import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MenuSection from './MenuSection'
import menuJSON from '../constants/menu.json';
import { cartConsts } from "../constants/cart-constants";


const Menu = (props) => {
    const [menuSections, setMenuSections] = useState([]);

    useEffect(() => {
        if (!!cartConsts.tables[props.match.params.number] || props.match.params.number === "takeout") {
            let menuSections = [];
            for (const section in menuJSON) {
                menuSections.push(<MenuSection data={menuJSON[section]}/>);
            }
            setMenuSections(menuSections);
        } else {
            props.history.push("/error");
        }
    }, [])
    return (
        <div>
            <h1>Menu</h1>
            {menuSections}
        </div>
    )
}

export default withRouter(connect()(Menu));