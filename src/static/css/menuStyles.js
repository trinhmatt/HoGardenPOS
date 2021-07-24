import { makeStyles, createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    color: {
        blue: '#4051b5',
    }
});

const menuStyles = makeStyles((theme) => ({
    //LAYOUT
    menuLayout: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        overflowX: 'hidden',
        minWidth: '100%',
        backgroundColor: '#f0f0f0',
    },
    header: {
        lineHeight: '0.05em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%'
    },
    foodLayout: {
        marginTop: '20vh'
    },
    switchLayout: {
        display: 'flex',
        alignItems: 'flex-end',
        width: '100%',
        marginTop: '-3vh',
        marginRight: '-5vh',
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
        color: '#4051b5',
        textAlign: 'center',
        border: '1px solid #4051b5',
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
        paddingTop: '5%',
        wordBreak: 'break-word',
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
    },
    item: {
        paddingRight: '5%',
        //ipad
        '@media (min-width: 760px)': {
            fontSize:'30px',
        },
    },
    qtyBubble: {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#ffbf00',
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
            transform: 'scale(0.5)',
        },
        //desktop
        '@media (min-width: 960px)': {
            padding: '5%',
            fontSize:'50px',
            transform: 'scale(0.3)'
        },
        
    },
    price: {
        fontWeight: 'bold',
        fontSize: '3vw',
        //desktop
        '@media (min-width: 990px)': {
            fontSize:'25px',
        },
    },

    //CART
    emptyCartBox: {
        backgroundColor: '#fff',
        width: '70vw',
        height: '20vh',
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        position: 'absolute',
        transform: 'translate(25%, 200%)',
        borderRadius: '10px'
    },
    chinCartText: {
        fontSize: '5vw'
    },
}));

export {menuStyles}