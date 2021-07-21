import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MenuSection from './MenuSection'
import menuJSON from '../static/constants/menu.json';
import { cartConsts } from "../static/constants/cart-constants";
import { changeLanguage } from "../redux/actions/lang-actions";

const Menu = (props) => {
    const numSections = Object.keys(menuJSON).length;
    const [menuSections, setMenuSections] = useState([]);
    const [headerSections, setHeaderSections] = useState([]);
    useEffect(() => {
        if (!!cartConsts.tables[props.match.params.number] || props.match.params.number === "takeout") {
            let menuSections = [];
            let headers = [];
            // This function is called every time a MenuSection is created (inside of useEffect)
            // The Section component calls this function after rendering menu items which sets the header section
            const returnTopPosition = (top, sectionTitle) => {
                headers.push(<span onClick={() => focusSection(top)} key={`headerSection/${top}`}>{sectionTitle}</span>);
                if (headers.length === numSections) {
                    setHeaderSections(headers);
                }
            }
            const focusSection = (topPosition) => {
                window.scrollTo(0, topPosition);
            }
            for (const section in menuJSON) {
                menuSections.push(<MenuSection lang={props.language} returnTopPosition={returnTopPosition} key={`menuSection/${section}`} data={menuJSON[section]}/>);
            }
            setMenuSections(menuSections);
        } else {
            props.history.push("/error");
        }
    }, [props.language]) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div>
            <div style={{overflowX: "scroll", width: "100vw", overflowY: "hidden", whiteSpace: "nowrap", position: "fixed", top: "0"}}>
                {headerSections}
            </div>
            <h1>Menu</h1>
            <button onClick={() => props.changeLanguage("chinese")}>to chinese</button>
            <button onClick={() => props.changeLanguage("english")}>to english</button>
            {menuSections}
        </div>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang
});

const mapDispatchToProps = dispatch => ({
    changeLanguage: (lang) => dispatch(changeLanguage(lang))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));