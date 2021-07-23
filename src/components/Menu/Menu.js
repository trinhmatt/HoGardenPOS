import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import MenuSection from './MenuSection'
import menuJSON from '../../static/constants/menu.json';
import { cartConsts } from "../../static/constants/cart-constants";
import { changeLanguage } from "../../redux/actions/lang-actions";
import Cart from "../Cart/Cart";

import Modal from '@material-ui/core/Modal';

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
import { Container } from '@material-ui/core';

//Subcomponent imports
import ElevationScroll from '../subcomponents/ElevationScroll';
import ScrollTop from '../subcomponents/ScrollTop';

//Icon imports
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const Menu = (props) => {
    const styles = menuStyles();
    const numSections = Object.keys(menuJSON).length;
    const [menuSections, setMenuSections] = useState([]);
    const [headerSections, setHeaderSections] = useState([]);
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        if (!!cartConsts.tables[props.match.params.number] || props.match.params.number === "takeout") {
            let menuSections = [];
            let headers = [];
            // This function is called every time a MenuSection is created (inside of useEffect)
            // The Section component calls this function after rendering menu items which sets the header section
            const returnTopPosition = (top, sectionTitle) => {
                headers.push(
                    <Container className={styles.scrollContainer}>
                        <span className={(props.language === 'chinese') ? styles.chinScrollItem : styles.engScrollItem} onClick={() => focusSection(top)} key={`headerSection/${top}`}>{sectionTitle}</span>
                    </Container>
                );
                if (headers.length === numSections) {
                    setHeaderSections(headers);
                }
            }
            const focusSection = (topPosition) => {
                const header = document.getElementById('menu-header').offsetHeight;
                window.scrollTo({ top: topPosition - header, behavior: 'smooth' });
            }
            for (const section in menuJSON) {
                menuSections.push(<MenuSection lang={props.language} returnTopPosition={returnTopPosition} key={`menuSection/${section}`} data={menuJSON[section]} />);
            }
            setMenuSections(menuSections);
        } else {
            props.history.push("/error");
        }
    }, [props.language]) // eslint-disable-line react-hooks/exhaustive-deps
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
                            <Typography className={styles.smallHeader}>ho garden chinese restaurant</Typography>
                            <Typography className={styles.bigHeader}>半島餐廳</Typography>
                            <FormGroup className={styles.switchLayout}>
                            <FormControlLabel
                                control={<Switch size="medium" checked={props.language === "chinese"} onChange={() => {
                                    (props.language === "chinese") ?
                                        props.changeLanguage("english") : props.changeLanguage("chinese")
                                }
                                }
                                />}
                                label={<b>中文</b>}
                            />
                        </FormGroup>
                            <Typography className={styles.menuScroll}>
                                {headerSections}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar id='top-anchor' />
                <Container className={styles.foodLayout}>
                <button onClick={() => setCartOpen(true)}>cart</button>
                    {/* Menu sections */}
                    {menuSections}
                    <Modal
                        open={isCartOpen}
                        onClose={closeCart}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {isCartOpen && <Cart />}
                    </Modal>
                </Container>
            </Container>
            {/* Scroll to top arrow */}
            <ScrollTop {...props}>
                <Fab color='primary' size='small'>
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    language: state.lang.lang,
    cart: state.cart
});

const mapDispatchToProps = dispatch => ({
    changeLanguage: (lang) => dispatch(changeLanguage(lang))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu));