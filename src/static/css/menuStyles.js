import { makeStyles } from '@material-ui/core/styles';

//theme
import theme from './theme'

//header banner
import banner from '../images/header.png';
import banneripad from '../images/header-ipad.png';
import bannerdesktop from '../images/header-desktop.png';
import bluebackground from '../images/1014.jpg';

const menuStyles = makeStyles(() => ({
    
    //GLOBALS
    margin0: {
        margin: '0',
    },

    //LAYOUT
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    centered: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    kindaCentered: {
        display: 'flex',
        justifyContent: 'center',
    },
    menuLayout: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        overflowX: 'hidden',
        backgroundColor: theme.palette.primary.main,
        //desktop
        '@media (min-width: 960px)': {
            maxWidth: 'none !important',
        },
    },
    authMenuLayout: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        overflowX: 'hidden',
        backgroundColor: theme.palette.primary.main,
        //desktop
        '@media (min-width: 960px)': {
            maxWidth: 'none !important',
        },
        display: 'flex !important',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    addItemLayout: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        overflow: 'hidden',
        position: 'fixed',
        backgroundColor: theme.palette.primary.main,
        display: 'flex !important',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100vh',
        width: '100vw',
    },
    header: {
        lineHeight: '0.05em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        //phone
        '@media (min-width: 375px)': {
            height: '24vh',
            backgroundImage: `url(${banner})`,
        },
        //ipad
        '@media (min-width: 760px)': {
            height: '25vh',
            backgroundImage: `url(${banneripad})`,
        },
        //desktop
        '@media (min-width: 960px)': {
            height: '25vh',
            backgroundPosition: 'center',
            backgroundImage: `url(${bannerdesktop})`,
        },
    },
    foodLayout: {
        width: '100%',
        paddingLeft: '0% !important',
        paddingRight: '0% !important',
        //phone
        '@media (min-width: 375px)': {
            marginTop: '18vh',
        },
        //ipad
        '@media (min-width: 760px)': {
            marginTop: '20vh',
        },
        //desktop
        '@media (min-width: 960px)': {
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        '@media screen and (orientation: landscape)': {
            padding: '0',
        },
    },
    authFoodLayout: {
        height: '70%',
        overflow: 'auto',
    },
    switchLayout: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        marginRight: '-7vh',
        padding: '5px',
    },
    authSwitchLayout: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        marginRight: '-5vh',
    },
    switchAddItemLayout: {
        marginTop: '-10vh',
    },
    backLayout: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        width: '100%',
        height: '30%',
        '@media screen and (orientation: landscape)': {
            height: '40%',
        },
    },
    backAddItemLayout: {
        marginTop: '-23vh',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.dark,
        borderRadius: '5px',
        //phone
        '@media (min-width: 375px)': {
            marginLeft: '-5vw',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '40px',
            marginLeft: '-3vw',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '40px',
            marginLeft: '2vw',
        },
    },
    itemChoiceLayout: {
        textAlign: 'center',
        lineHeight: '0.5em',
        marginBottom: '40px',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '12px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '20px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '20px',
        },
    },
    chinItemChoiceLayout: {
        textAlign: 'center',
        lineHeight: '0.5em',
        marginBottom: '40px',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '18px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '30px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '35px',
        },
    },
    cartLayout: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    authCartLayout: {
        overflow: 'auto', 
        height: '100vh',
        backgroundColor: theme.palette.secondary.darker,
    },

    //HEADERS
    smallHeader: {
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(','),
        fontSize: '15px',
        color: '#fff',
        textTransform: 'uppercase',
    },
    bigHeader: {
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(','),
        fontSize: '40px',
        color: '#fff',
    },
    menuSectionTitle: {
        textTransform: 'uppercase',
        fontSize: '4vh',
        color: theme.palette.primary.main,
        textAlign: 'center',
        border: `2px solid ${theme.palette.secondary.dark}`,
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
        paddingTop: '5%',
        wordBreak: 'break-word',
        marginBottom: '0',
    },
    cartTitle: {
        textTransform: 'uppercase',
        fontSize: '30px',
        color: theme.palette.primary.main,
        textAlign: 'center',
        border: `1px solid ${theme.palette.primary.main}`,
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
        marginTop: '5%',
    },
    chinLanguage: {
        color: theme.palette.secondary.main,
    },

    //SCROLL
    menuScroll: {
        overflowX: "scroll", 
        width: "100vw", 
        overflowY: "hidden", 
        whiteSpace: "nowrap",
        backgroundColor: '#fff',
        padding: '20px',
        display: 'flex',
        justifyContent: 'flex-start'
    },
    authMenuScroll: {
        width: '100%',
        backgroundColor: '#fff',
        border: '2px solid #000',
        height: '23vh',
        overflow: 'auto',
        borderRadius: '5px',
    },
    engScrollItem: {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '25px',
        padding: '10px 15px 10px 15px',
        textTransform: 'uppercase',
        fontSize: '11px',
    },
    chinScrollItem: {
        backgroundColor: '#000',
        color: '#fff',
        borderRadius: '25px',
        padding: '10px 15px 10px 15px',
        textTransform: 'uppercase',
        fontSize: '18px',
    },
    authScrollItem: {
        backgroundColor: '#000',
        color: '#fff',
        padding: '10px 15px 10px 15px',
        textTransform: 'uppercase',
        fontSize: '18px',
        margin: '2px',
        float: 'left',
    },
    scrollContainer: {
        padding: '2px !important',
    },
    toTopArrow: {
        position: 'fixed',
        bottom: '2vh',
        right: '2vw',
        zIndex: '100',
    },

    //MENU SECTIONS
    menuSection: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    authMenuSection: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    menuItemSection: {
        padding: '3%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        position: 'relative',
        //desktop/ipad
        '@media (min-width: 760px)': {
            padding: '2%',
            maxHeight: '10vh',
        },
    },
    menuItemSectionQty: {
        padding: '3%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        position: 'relative',
        border: `2px solid ${theme.palette.secondary.dark}`,
        boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
        //desktop/ipad
        '@media (min-width: 760px)': {
            padding: '2%',
            maxHeight: '10vh',
        },
    },
    engMenuItem: {
        paddingRight: '5%',
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'20px',
        },
    },
    chinMenuItem: {
        paddingRight: '5%',
        fontSize: '20px',
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'25px',
        },
    },
    qtyBubble: {
        position: 'absolute',
        top: '0',
        right: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.secondary.dark,
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
        paddingTop: '1%',
        paddingBottom: '1%',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '15px',
            width: '30px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'18px',
            width: '35px',
            height: '20px',
        },
        //desktop
        '@media (min-width: 960px)': {
            padding: '0',
            fontSize:'20px',
        },
        
    },
    price: {
        fontWeight: 'bold',
        fontSize: '3.5vw',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        margin: '0',
        //desktop
        '@media (min-width: 990px)': {
            fontSize:'25px',
        },
    },
    priceColumn: {
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    menuExtraInfo: {
        color: theme.palette.primary.dark,
        margin: '2%',
        //phone
        '@media (min-width: 375px)': {
            fontSize:'12px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'18px',
        },
    },
    infoLabel: {
        color: theme.palette.primary.light,
    },

    //CART
    modal: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    cartBox: {
        backgroundColor: '#fff',
        width: '95%',
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '5%',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    authCartBox: {
        backgroundColor: '#fff',
        width: '95%',
        height: '75%',
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '5%',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    emptyCartBox: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        padding: '20px',
        color: theme.palette.primary.dark,
    },
    cartLayoutBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '70%',
        width: '95%'
    },
    authCartLayoutBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    chinCartText: {
        fontSize: '3vw'
    },
    cartIcon: {
        backgroundColor: `${theme.palette.secondary.main} !important`,
        color: `${theme.palette.primary.dark} !important`,
    },
    cartItemSection: {
        display: 'flex',
        alignItems: 'center',
        //phone
        '@media (min-width: 375px)': {
            padding: '3%',
        },
        //ipad + desktop
        '@media (min-width: 760px)': {
            paddingTop: '5%',
            paddingBottom: '5%',
            paddingLeft: '0',
            paddingRight: '0',
        },
    },
    cartQty: {
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        paddingLeft: '25%',
        paddingRight: '25%',
        paddingTop: '7%',
        paddingBottom: '7%',
        fontSize: '14px',
    },
    cartPrice: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '10px !important',
    },
    cartQtyBtns: {
        padding: '0',
    },
    qtyBtnColor: {
        color: '#000'
    },
    cartAddonTitle: {
        padding: '2% !important',
        margin: '5px',
        textAlign: 'center',
        wordBreak: 'break-word',
        backgroundColor: theme.palette.secondary.lighter,
        color: theme.palette.primary.main,
    },
    chinCartAddonTitle: {
        padding: '2% !important',
        textAlign: 'center',
        wordBreak: 'break-word',
        backgroundColor: theme.palette.secondary.lighter,
        color: theme.palette.primary.main,
        fontSize: '20px',
        lineHeight: '1.2em',
    },
    chinCartItem: {
        fontSize: '20px',
    },
    cartSubtitle: {
        fontSize: '12px',
        color: theme.palette.primary.light,
    },
    cartTotals: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '95%',
        padding: '5%',
        backgroundColor: 'gainsboro',
    },
    chinCartTotals: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        width: '95%',
        padding: '5%',
        backgroundColor: 'gainsboro',
        fontSize: '20px',
    },
    cartBorder: {
        border: '1px solid #000',
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
    },

    //ADD ITEM 
    addItemContainer: {
        overflow: 'auto',
        width: '95% !important',
        //phone
        '@media (min-width: 375px)': {
            height: '70%',
        },
        //ipad
        '@media (min-width: 760px)': {
            height: '65%',
        },
    },
    addItemChoices: {
        display: 'flex',
        flexDirection: 'column',
    },
    addItemSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        padding: '5%',
    },
    itemTitle: {
        padding: '5%',
        textAlign: 'center',
        wordBreak: 'break-word',
        border: `2px dashed ${theme.palette.secondary.dark}`,
        color: theme.palette.primary.main,
        margin: '0',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '20px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '35px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '30px',
        },
    },
    chinItemTitle: {
        padding: '5%',
        textAlign: 'center',
        wordBreak: 'break-word',
        border: `2px dashed ${theme.palette.secondary.dark}`,
        color: theme.palette.primary.main,
        margin: '0',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '25px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '50px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '35px',
        },
    },
    addOnText: {
        textTransform: 'uppercase', 
        fontSize: '14px',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '20px',
        },
    },
    chinAddOnText: {
        textTransform: 'uppercase', 
        fontSize: '20px',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '30px',
        },
    },
    itemChoices: {
        color: '#000',
        backgroundColor: '#f8f8ff !important',
        lineHeight: '1em',
        wordBreak: 'break-word',
        borderRadius: '5px !important',
        border: '1px solid #000 !important',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '20px',
        },
    },
    chinItemChoices: {
        color: '#000',
        backgroundColor: '#f8f8ff !important',
        fontSize: '20px',
        lineHeight: '1em',
        borderRadius: '5px !important',
        border: '1px solid #000 !important',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '30px',
        },
    },
    selectedChoice: {
        backgroundColor: '#000 !important',
        color: '#fff',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '20px',
        }
    },
    chinSelectedChoice: {
        backgroundColor: '#000 !important',
        color: '#fff',
        fontSize: '20px',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '30px',
        }
    },
    itemChoiceGroup: {
        backgroundColor: '#fff',
    },
    addItemQtyBtn: {
        color: '#000',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '40px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '60px',
        },
    },
    addOnQtyBtn: {
        color: '#000',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '28px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '30px',
        },
    },
    disabledAddOnQtyBtn: {
        color: 'darkgray',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '28px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '30px',
        },
    },
    disabledAddItemQtyBtn: {
        color: 'darkgray',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '40px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '60px',
        },
    },
    addToOrderBtn: {
        width: '75%',
        position: 'fixed',
        bottom: '10px',
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
        fontSize: '18px',
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '20px',
        },
        '&:disabled': {
            opacity: '0.7',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.dark,
        },
    },
    chinAddToOrderBtn: {
        width: '75%',
        position: 'fixed',
        bottom: '10px',
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '20px',
        '&:disabled': {
            opacity: '0.7',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.dark,
        },
    },
    authAddToOrderBtn: {
        width: '75%',
        marginTop: '-5%',
        marginBottom: '15%',
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '20px',
        },
        '&:disabled': {
            opacity: '0.7',
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.primary.dark,
        },
    },

    //REVIEW ORDER
    reviewLayout: {
        backgroundImage: `url(${bluebackground})`,
        backgroundSize: '852.22px 862.23px',
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
        zIndex: '-2',
    },
    reviewBox: {
        height: '100%',
        width: '80%',
        overflow: 'auto',
        padding: '5%',
        margin: '20% auto',
        display: 'flex',
        flexDirection: 'column',
        //ipad
        '@media (min-width: 760px)': {
            height: '80%',
        },
        //desktop
        '@media (min-width: 960px)': {
            height: '500px',
            margin: '200px auto',
        },
    },
    reviewTotal: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        fontSize: '2.2vh',
        marginTop: '10%',
        backgroundColor: 'gainsboro',
        padding: '15px',
    },
    authTableNumber: {
        fontSize: '30px',
        textAlign: 'center',
        backgroundColor: '#000',
        width: '33%',
        color: '#fff',
        position: 'fixed',
    },
    reviewAddToOrderBtn: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.dark,
    },

    //RIBBON
    ribbon: {
        width: '280px',
        height: '40px',
        position: 'absolute',
        margin: '12% auto',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.secondary.dark}`,
        backgroundColor: theme.palette.secondary.light,
        textTransform: 'uppercase',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 0 30px rgba(0,0,0,0.2) inset, 0 6px 10px rgba(0,0,0,0.2)',

        '&:before, &:after': {
            content: "''",
            position: 'absolute',
            zIndex: '-1',
            left: '-25px',
            top: '25px',
            width: '12px',
            border: `15px solid ${theme.palette.secondary.light}`,
            borderRight: `8px solid ${theme.palette.secondary.darker}`,
            borderBottomColor: theme.palette.secondary.main,
            borderLeftColor: 'transparent',
            transform: 'rotate(-5deg)',
        },
        '&:after': {
            left: 'auto',
            right: '-20px',
            borderLeft: `8px solid ${theme.palette.secondary.darker}`,
            borderRight: '8px solid transparent',
            transform: 'rotate(5deg)',
        },
    },

    //ICONS
    printerIcon: {
        backgroundColor: '#fff',
        color: '#000',
        margin: '10px',
        padding: '10px',
    },
}));

export {menuStyles}