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

//Material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import Modal from '@material-ui/core/Modal';
import { Container } from '@material-ui/core';

//Subcomponent imports
import ElevationScroll from '../subcomponents/ElevationScroll';
import CartButton from '../subcomponents/CartButton';

//Icon imports
import ShoppingCart from '@material-ui/icons/ShoppingCart';

const Menu = (props) => {

    dayjs.extend(isBetween);
    const styles = menuStyles();
    const numSections = Object.keys(menuJSON).length;
    const { language, changeLanguage, auth, cart } = props;
    const isAdminUpdate = !!cart.orderItems;
    const [state, setState] = useState({
                                menuSections: [],
                                headerSections: [],
                                isCartOpen: false,
                                errorMsg: ""
                            });

    useEffect(() => {
        if (state.menuSections.length > 0) {
            let headerSections = [];
            const focusSection = (sectionId) => {
                const section = document.getElementById(sectionId);
                
                // Admin and customer have different headers which require different scroll to logic
                if (props.location.pathname.indexOf("admin") > -1) {
                    section.scrollIntoView();
                } else {
                    const header = document.getElementById('menu-header').offsetHeight;
                    window.scrollTo({ top: (section.offsetTop - header), behavior: 'smooth' });
                }
            }
            for (let i = 0; i < state.menuSections.length; i++) {
                headerSections.push(
                    <Container key={state.menuSections[i].props.data.title[language]} className={!auth.userData && styles.scrollContainer}>
                        <span 
                            className={auth.userData ? styles.authScrollItem : language === 'chinese' ? styles.chinScrollItem : styles.engScrollItem} 
                            onClick={() => focusSection(state.menuSections[i].props.data.title[language])} 
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
                const hours = snapshot.val();
                const open = dayjs(hours.open, authConsts['24_HOUR_TIME']);
                const close = dayjs(hours.close, authConsts['24_HOUR_TIME']);

                if (dayjs().isBetween(open, close, null, '[]') && hours[dayjs().format('dddd').toUpperCase()]) {
                    renderHeader();
                    if (props.match.params.number !== "takeout") {
                        database.ref(`orders/${dayjs().format(authConsts.DATE)}`).once("value")
                            .then( (snapshot) => {
                                const orders = snapshot.val(); 
            
                                if (orders) {
                                    for (let i = 0; i < orders.length; i++) {
                                        if (orders[i].table === props.match.params.number && !isAdminUpdate) {
                                            props.history.push(`${props.match.params.number}/review`);
                                        }
                                    }
                                }
                            })
                    }
                } else {
                    setState({...state, errorMsg: "We are currently closed! Please come back again."});
                }

            })
            .catch( err => setState({...state, errorMsg: err}))
        
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    const renderHeader = () => {
        if ((!!cartConsts.tables[props.match.params.number] || props.match.params.number === "takeout") && state.errorMsg.length === 0) {
            let menuSections = [];
            
            for (const section in menuJSON) {
                menuSections.push(<MenuSection lang={language} key={`menuSection/${section}`} data={menuJSON[section]} />);
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
            {state.errorMsg.length > 0 && <p>{state.errorMsg}</p>}
            {!state.errorMsg && state.menuSections.length === numSections && 
                <Container className={styles.menuLayout}>
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
                                        <Typography className={styles.menuScroll}>
                                            {state.headerSections}
                                        </Typography>
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
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {state.isCartOpen && <Cart />}
            </Modal>
            {/* Cart button */}
            {
                !auth.userData && !state.errorMsg && state.headerSections.length === numSections &&
                <CartButton {...props} cartOpen={openCart}>
                    <Fab className={styles.cartIcon} size='large'>
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