import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import dayjs from 'dayjs';

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
    const styles = menuStyles();
    const numSections = Object.keys(menuJSON).length;
    const { language, changeLanguage, auth } = props;
    const [menuSections, setMenuSections] = useState([]);
    const [headerSections, setHeaderSections] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        database.ref(`orders/${dayjs().format(authConsts.DATE)}`).once("value")
            .then( (snapshot) => {
                const orders = snapshot.val(); 

                if (orders) {
                    for (let i = 0; i < orders.length; i++) {
                        if (orders[i].table === props.match.params.number) {
                            props.history.push(`${props.match.params.number}/review`);
                        }
                    }
                }
            })
    }, [])

    useEffect(() => {
        if (!!cartConsts.tables[props.match.params.number] || props.match.params.number === "takeout") {
            let menuSections = [];
            let headers = [];
            // This function is called every time a MenuSection is created (inside of useEffect)
            // The Section component calls this function after rendering menu items which sets the header section
            const returnTopPosition = (top, sectionTitle) => {
                headers.push(
                    <Container className={styles.scrollContainer}>
                        <span className={(language === 'chinese') ? styles.chinScrollItem : styles.engScrollItem} onClick={() => focusSection(top)} key={`headerSection/${top}`}>{sectionTitle}</span>
                    </Container>
                );
                if (headers.length === numSections) {
                    setHeaderSections(headers);
                }
            }
            const focusSection = (topPosition) => {
                const header = document.getElementById('menu-header').offsetHeight;
                window.scrollTo({ top: (topPosition - header), behavior: 'smooth' });
            }
            for (const section in menuJSON) {
                menuSections.push(<MenuSection lang={language} returnTopPosition={returnTopPosition} key={`menuSection/${section}`} data={menuJSON[section]} />);
            }
            setMenuSections(menuSections);
        } else {
            props.history.push("/error");
        }
    }, [language]) // eslint-disable-line react-hooks/exhaustive-deps
    const closeCart = () => {
        setCartOpen(false);
    }
    return (
        <React.Fragment>
            <Container className={styles.menuLayout}>
                {/* Header */}
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
                                {headerSections}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar />
                <Container className={styles.foodLayout}>
                    {/* Menu sections */}
                    {menuSections}
                </Container>
            </Container>
            {/* Cart modal */}
            <Modal
                className={styles.modal}
                open={isCartOpen}
                onClose={closeCart}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {isCartOpen && <Cart />}
            </Modal>
            {/* Cart button */}
            <CartButton {...props} cartOpen={setCartOpen}>
                <Fab className={styles.cartIcon} size='large'>
                    <ShoppingCart />
                </Fab>
            </CartButton>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang,
    auth: state.auth
});

const mapDispatchToProps = dispatch => ({
    changeLanguage: (lang) => dispatch(changeLanguage(lang))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));