import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';

import MenuSection from './MenuSection'
import menuJSON from '../../static/constants/menu.json';
import { cartConsts } from "../../static/constants/cart-constants";
import { authConsts } from '../../static/constants/auth-constants';
import { changeLanguage } from "../../redux/actions/lang-actions";
import Cart from "../Cart/Cart";

import database from '../../firebase/firebase';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import { homeStyles } from '../../static/css/homeStyles';

//Material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import { Container, Divider } from '@material-ui/core';

//Subcomponent imports
import ElevationScroll from '../subcomponents/ElevationScroll';
import CartButton from '../subcomponents/CartButton';

//Icon imports
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Menu = (props) => {

    dayjs.extend(isBetween);
    //styles
    const styles = menuStyles();
    const hStyles = homeStyles();

    const numSections = Object.keys(menuJSON).length;
    const { language, changeLanguage, auth, cart } = props;
    const isAdminUpdate = !!cart.orderItems;
    const [state, setState] = useState({
                                menuSections: [],
                                headerSections: [],
                                isCartOpen: false,
                                errorMsg: "",
                                cartQty: 0,
                            });

    useEffect(() => {
        if (state.menuSections.length > 0) {
            let headerSections = [];
            for (let i = 0; i < state.menuSections.length; i++) {
                headerSections.push(
                    <Container key={state.menuSections[i].props.data.title[language]} className={!auth.userData ? styles.scrollContainer : ''}>
                        <span 
                            className={auth.userData ? styles.authScrollItem : language === 'chinese' ? styles.chinScrollItem : styles.engScrollItem} 
                            onClick={() => scrollToElement(state.menuSections[i].props.data.title[language])} 
                            key={`headerSection/${state.menuSections[i].props.data.title[language]}`}>
                                {state.menuSections[i].props.data.title[language]}
                        </span>
                    </Container>
                )
            }
            setState({...state, headerSections});
        }
    }, [state.menuSections, language])

    useEffect(() => {
        database.ref('hoursOfOperation').once('value')
            .then( snapshot => {
                const days = snapshot.val();
                const currentDay = dayjs().format("dddd").toUpperCase();
                const open = dayjs(days[currentDay].open, authConsts['24_HOUR_TIME']);
                const close = dayjs(days[currentDay].close, authConsts['24_HOUR_TIME']);

                if (days[currentDay].isOpen && dayjs().isBetween(open, close, null, '[]')) {
                    renderHeader();
                } else {
                    setState({...state, errorMsg: "We are currently closed\nPlease come back again!\n我們目前已關閉。請再來！"});
                }

            })
            .catch( err => setState({...state, errorMsg: err}))
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const scrollToElement = (sectionId) => {
        const section = document.getElementById(sectionId);
        
        // Admin and customer have different headers which require different scroll to logic
        if (props.location.pathname.indexOf("admin") > -1) {
            section.scrollIntoView();
        } else {
            const header = document.getElementById('menu-header').offsetHeight;
            window.scrollTo({ top: (section.offsetTop - header), behavior: 'smooth' });
        }
    }

    const renderHeader = () => {
        if ((!!cartConsts.tables[props.match.params.number] || props.match.params.number === "takeout") && state.errorMsg.length === 0) {
            let menuSections = [];
            
            for (const section in menuJSON) {
                // menuSections.push(
                //     <MenuSection 
                //         lastClickedElement={props.location.state ? props.location.state.lastClickedElement : null} 
                //         lang={language} key={`menuSection/${section}`} 
                //         data={menuJSON[section]} 
                //     />
                // );
                if (!menuJSON[section].startTime || 
                    (menuJSON[section].startTime && dayjs().isBetween(dayjs(menuJSON[section].startTime, authConsts['24_HOUR_TIME']), dayjs(menuJSON[section].endTime, authConsts['24_HOUR_TIME']), null, '[]'))
                ) {
                    menuSections.push(
                        <MenuSection 
                            lastClickedElement={props.location.state ? props.location.state.lastClickedElement : null} 
                            lang={language} key={`menuSection/${section}`} 
                            data={menuJSON[section]} 
                        />
                    );
                    
                }
            }
            
            setState({...state, menuSections})
        } else {
            props.history.push("/error");
        }
    }
    const closeCart = () => {
        setState({...state, isCartOpen: false});
    }
    const openCart = () => {
        setState({...state, isCartOpen: true});
    }
    return (
        <React.Fragment>
            {state.errorMsg.length > 0 ? 
                <div className={hStyles.homebg} style={{justifyContent: 'center'}}>
                    <div className={styles.centered} style={{flexDirection: 'column'}}>
                    <div className={hStyles.title}>半島餐廳</div>
                    <p className={hStyles.errorText}>{state.errorMsg}</p>
                    </div>
                </div>
                :
                <div></div>
            }
            {!state.errorMsg && state.menuSections.length > 0 && 
                <Container className={!auth.userData ? styles.menuLayout : styles.authMenuLayout}>
                    {/* Header */}
                    {
                        !auth.userData ?
                        <div>
                            <ElevationScroll {...props}>
                                <AppBar id='menu-header'>
                                    <Toolbar className={styles.header}>
                                        <FormGroup className={styles.switchLayout}>
                                            <FormControlLabel
                                                control={<Switch size="medium" checked={language === "chinese"} onChange={() => {
                                                    (language === "chinese") ?
                                                        changeLanguage("english") : changeLanguage("chinese")
                                                }}
                                                />}
                                                label={<b className={styles.chinLanguage}>中文</b>}
                                            />
                                        </FormGroup>
                                        <div className={styles.menuScroll}>
                                            {state.headerSections}
                                        </div>
                                    </Toolbar>
                                </AppBar>
                            </ElevationScroll>
                            <Toolbar />
                        </div>
                        :
                        <div id='menu-header'>
                            <FormGroup className={styles.authSwitchLayout}>
                                <FormControlLabel
                                    control={<Switch size="medium" checked={language === "chinese"} onChange={() => {
                                        (language === "chinese") ?
                                            changeLanguage("english") : changeLanguage("chinese")
                                    }}
                                    />}
                                    label={<b className={styles.chinLanguage}>中文</b>}
                                />
                            </FormGroup>
                            <div className={styles.authMenuScroll}>
                                {state.headerSections}
                            </div>
                        </div>
                    }
                    <Container className={auth.userData ? styles.authFoodLayout : styles.foodLayout}>
                        {/* Menu sections */}
                        {state.menuSections}
                    </Container>
                </Container>}
            {/* Cart modal */}
            <Modal
                className={styles.modal}
                open={state.isCartOpen}
                onClose={closeCart}
            >
                {state.isCartOpen ? <Cart /> : <div></div>}
            </Modal>
            {/* Cart button */}
            {
                !auth.userData && !state.errorMsg && state.headerSections.length > 0 &&
                <CartButton {...props} cartOpen={openCart}>
                    <Fab className={styles.cartIcon} size='large'>
                        {cart.length}
                        <ShoppingCart />
                    </Fab>
                </CartButton>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang,
    auth: state.auth,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    changeLanguage: (lang) => dispatch(changeLanguage(lang))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));