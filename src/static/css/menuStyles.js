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
        },
    },
    foodLayout: {
        width: '110%',
        height: '100vh',
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
    },
    addItemLayout: {
        width: '110%',
        height: '100vh',
        //phone
        '@media (min-width: 375px)': {
            marginTop: '20vh',
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
    },

    //MENU SECTIONS
    menuSection: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    section: {
        padding: '3%',
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        //desktop/ipad
        '@media (min-width: 760px)': {
            padding: '0',
            maxHeight: '10vh',
        },
    },
    item: {
        paddingRight: '5%',
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'25px',
        },
    },
    qtyBubble: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'bold',
        boxShadow: '0 1px 10px rgba(0,0,0,0.2)',
        borderRadius: '50%',
        //phone
        '@media (min-width: 375px)': {
            padding: '5%',
            fontSize:'15px',
            transform: 'scale(0.5)',
        },
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'30px',
            transform: 'scale(0.4)',
        },
        //desktop
        '@media (min-width: 960px)': {
            padding: '5%',
            fontSize:'50px',
            transform: 'scale(0.2)'
        },
        
    },
    price: {
        fontWeight: 'bold',
        fontSize: '3.5vw',
        //desktop
        '@media (min-width: 990px)': {
            fontSize:'25px',
        },
    },

    //CART
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cartBox: {
        backgroundColor: '#fff',
        width: '85vw',
        height: '80vh',
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
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
        cartPrice: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    cartQtyBtns: {
        padding: '0',
    },
    qtyBtnColor: {
        color: '#000'
    },

    //ADD ITEM 
    addItemSection: {
        height: '68vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemTItle: {
        padding: '5%',
        textAlign: 'center',
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