import { makeStyles, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    color: {
        blue: '#4051b5',
    }
});

const menuStyles = makeStyles((theme) => ({
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
    menuLayout: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        overflowX: 'hidden',
        minWidth: '100%',
        backgroundColor: '#fdb678',
    },
    header: {
        lineHeight: '0.05em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: 'url(https://i.imgur.com/Vq44CWs.png)',
        backgroundSize: 'cover',
        //phone
        '@media (min-width: 375px)': {
            height: '23vh',
        },
        //ipad
        '@media (min-width: 760px)': {
            height: '25vh',
        },
        //desktop
        '@media (min-width: 960px)': {
            height: '25vh',
            backgroundPosition: 'center',
        },
    },
    foodLayout: {
        width: '110%',
        //phone
        '@media (min-width: 375px)': {
            marginTop: '18vh',
            marginLeft: '-5vw',
        },
        //ipad
        '@media (min-width: 760px)': {
            marginTop: '20vh',
            marginLeft: '-5vw',
        },
        //desktop
        '@media (min-width: 960px)': {
            marginTop: '25vh',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        '@media screen and (orientation: landscape)': {
            padding: '0',
        },
    },
    addItemLayout: {
        width: '110%',
        height: '100vh',
        //phone
        '@media (min-width: 375px)': {
            marginTop: '16vh',
            marginLeft: '-5vw',
        },
        //ipad
        '@media (min-width: 760px)': {
            marginTop: '22vh',
            marginLeft: '-5vw',
        },
        //desktop
        '@media (min-width: 960px)': {
            marginTop: '25vh',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    switchLayout: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: '-3vh',
        marginRight: '-5vh',
    },
    switchAddItemLayout: {
        marginTop: '-10vh',
    },
    backLayout: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    backAddItemLayout: {
        marginTop: '-23vh',
        backgroundColor: '#000',
        color: '#fff',
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
        //phone
        '@media (min-width: 375px)': {
            fontSize: '10px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '15px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '20px',
        },
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
        color: '#809978',
        textAlign: 'center',
        border: '1px solid #7f9877',
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
        color: '#809978',
        textAlign: 'center',
        border: '1px solid #7f9877',
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
        marginTop: '5%',
    },
    chinLanguage: {
        color: '#000',
    },

    //SCROLL
    menuScroll: {
        overflowX: "scroll", 
        width: "100vw", 
        overflowY: "hidden", 
        whiteSpace: "nowrap",
        backgroundColor: '#fff',
        padding: '2vh',
        display: 'flex',
        justifyContent: 'flex-start'
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
    scrollContainer: {
        padding: '2px',
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
        '@media screen and (orientation: landscape)': {
            width: '85vw'
        },
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
        border: '2px solid #7f9877',
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
            fontSize:'25px',
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
        backgroundColor: '#7f9877',
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
            width: '40px',
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
        color: '#DE6434',
        margin: '2%',
        //phone
        '@media (min-width: 375px)': {
            fontSize:'12px',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'18px',
        },
        //desktop
        '@media (min-width: 960px)': {
        },
    },

    //CART
    modal: {
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    cartBox: {
        backgroundColor: '#fff',
        width: '95vw',
        height: '80vh',
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        paddingTop: '5%',
        overflowY: 'auto',
    },
    emptyCartBox: {
        width: '70vw',
        height: '20vh',
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    chinCartText: {
        fontSize: '5vw'
    },
    cartIcon: {
        backgroundColor: '#7f9877',
        color: '#fff',
    },
    cartItemSection: {
        display: 'flex',
        alignItems: 'center',
        //phone
        '@media (min-width: 375px)': {
            padding: '5%',
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
        backgroundColor: '#7f9877',
        color: '#fff',
        paddingLeft: '15%',
        paddingRight: '15%',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '14px',
            paddingTop: '7%',
            paddingBottom: '7%',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize: '14px',
            paddingTop: '7%',
            paddingBottom: '7%',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '14px',
        },
    },
    cartPrice: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cartQtyBtns: {
        padding: '0',
    },
    qtyBtnColor: {
        color: '#000'
    },

    //ADD ITEM 
    addItemSection: {
        height: '70%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '5%',
    },
    itemTItle: {
        padding: '5%',
        textAlign: 'center',
        wordBreak: 'break-word',
        //phone
        '@media (min-width: 375px)': {
            fontSize: '20px',
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
    itemChoices: {
        color: '#000',
    },
    selectedChoice: {
        backgroundColor: '#000',
        color: '#fff',
    },
    itemChoiceGroup: {
        backgroundColor: '#fff',
    },
    addItemQtyBtn: {
        fontSize: '40px',
        color: '#000',
    },
    disabledAddItemQtyBtn: {
        fontSize: '40px',
        color: 'darkgray',
    },
    addToOrderBtn: {
        width: '85%',
        position: 'fixed',
        bottom: '1vh',
        backgroundColor: '#000',
        color: '#fff',
    }
}));

export {menuStyles}