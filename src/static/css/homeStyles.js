import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

//Image
import home from '../images/home.jpeg';

const homeStyles = makeStyles(() => ({

    // BACKGROUND
    homebg: { 
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        overflow: 'auto',
        width: '100vw',
        height: '100vh',
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(','),
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    tableBg: {
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        width: '100vw',
        height: '110vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'auto',
    },
    loginbg: {
        backgroundImage: `url(${home})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    // LAYOUT
    header: {
        textAlign: 'center',
        width: '25%',
        padding: '5%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    centerWrapper: {
        textAlign: 'center',
        padding: '10%',
        marginTop: '-10%',
    },
    inputWrapper: {
        textAlign: 'center',
    },
    centered: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    tableLayout: {
        margin: '2%',
    },

    // TITLE
    homeTitle: {
        fontWeight: '400',
        color: '#000',
        lineHeight: '1em',
        margin: 0,
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(','),
        '@media screen and (orientation: portrait)': {
            fontSize: '25px',
        },
        '@media screen and (orientation: landscape)': {
            fontSize: '35px'
        },
    },
    homeTitle2: {
        fontWeight: '400',
        color: '#000',
        lineHeight: '1em',
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(','),
        '@media screen and (orientation: portrait)': {
            fontSize: '35px',
            marginTop: '-3%',
        },
        '@media screen and (orientation: landscape)': {
            fontSize: '55px',
            marginTop: '-1%',
            marginBottom: '1%',
        },
    },
    ordersTitle: {
        fontWeight: '400',
        color: '#fff',
        lineHeight: '1em',
        margin: 0,
        '@media screen and (orientation: portrait)': {
            fontSize: '4vh',
        },
        '@media screen and (orientation: landscape)': {
            fontSize: '5vh'
        },
    },
    ordersTitle2: {
        fontWeight: '400',
        color: '#fff',
        lineHeight: '1em',
        '@media screen and (orientation: portrait)': {
            fontSize: '9vh',
            marginTop: '-1%',
        },
        '@media screen and (orientation: landscape)': {
            fontSize: '10vh',
            marginTop: '-1%',
            marginBottom: '1%',
        },
    },
    subTitle: {
        fontWeight: '400',
        fontSize: '20px',
        color: '#fff',
        lineHeight: '1em',
    },
    subTitle2: {
        fontWeight: '400',
        color: '#fff',
        lineHeight: '1em',
        fontSize: '50px',
        marginTop: '-1%',
    },

    // BUTTONS
    orderBtn: {
        backgroundColor: '#ffa500 !important',
        color: '#fff !important',
        transform: 'scale(2)',
    },

    // CARD
    loginCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'auto',
        '@media screen and (orientation: portrait)': {
            width: '80vw',
            height: '50vh',
        },
        '@media screen and (orientation: landscape)': {
            width: '60vw',
            height: '82vh',
        },
        '@media screen and (min-width: 760px) and (orientation: portrait)': {
            width: '55vw',
            height: '35vh',
        },
        '@media screen and (min-width: 760px) and (orientation: landscape)': {
            width: '40vw',
            height: '52vh',
        },
    },
    loginAction: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0',
    },

    // INPUT
    inputField: {
        width: '80% !important',
    },

    //TIMETABLE
    tableWrapper: {
        transform: 'scale(0.85)',
        margin: '0 auto',
    },
    dateWrapper: {
        position: 'fixed',
        top: '0',
        display: 'flex',
        flexDirection: 'row',
        padding: '1%',
        backgroundColor: '#fff',
        border: '2px solid #000',
    },
    dateRangeWrapper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '1%',
        backgroundColor: '#fff',
        border: '3px solid #000',
    },

    //NAV
    bottomNav: {
        justifyContent: 'space-evenly',
        position: 'fixed',
        bottom: '0%',
        width: '100%',
        zIndex: '99',
    },

    //ORDERS
    orderLayout: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        overflow: 'auto',
    },
    orderCard: {
        width: '40%',
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: '2%',
    },
    orderTable: {
        fontSize: '25px',
        textAlign: 'center',
        backgroundColor: 'lightgrey',
        boxShadow: '1px 2px 5px rgb(0 0 0 / 20%)',
    },
    orderGrid: {
        padding: '2%',
    },
    orderQty: {
        padding: '10%',
        backgroundColor: '#000',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '25px',
        width: '50%',
        textAlign: 'center',
        boxShadow: '1px 2px 5px rgb(0 0 0 / 20%)',
    },
    orderQtyGrid: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    orderAddOns: {
        fontSize: '20px',
    },
    orderCardTotal: {
        padding: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        backgroundColor: 'grey',
    },
    orderTime: {
        textAlign: 'right',
        marginRight: '10px',
        color: '#32cd59',
    },
    completeButton: {
        color: '#32cd59',
    },
    pastOrderTableCell: {
        backgroundColor: '#000',
        color: '#fff',
        textTransform: 'uppercase',
        padding: '10px',
    },
    pastOrderHeader: {
        color: '#fff',
    },
    pastOrderTotal: {
        backgroundColor: 'lightgrey',
        border: '2px solid #000',
        borderTop: 'transparent',
        borderLeft: 'transparent',
        borderRight: 'transparent',
    },
    pastOrderItem: {
        fontSize: '25px',
    },
    pastOrderAddOn: {
        fontSize: '20px',
    },

    //TAKEOUT
    takeoutBtnWrapper: {
        position: 'fixed',
        top: '1%',
        left: '1%',
    },
    takeoutBtn: {
        backgroundColor: '#32cd59 !important',
        color: '#000 !important',
        fontWeight: 'bold',
        fontSize: '20px'
    },

    //TABLES
    hTable: {
        width: '100px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    smolhTable: {
        width: '80px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    vTable: {
        width: '50px',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    roundTable: {
        borderRadius: '50%',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    orderTakenTable: {
        backgroundColor: '#32cd59',
        border: '2px solid #000',
    },

    //ERROR PAGE
    title: {
        fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
        color: '#ffdd7a',
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '50px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '80px',
            letterSpacing: '15px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '80px',
            letterSpacing: '20px',
        },
    },
    errorText: {
        fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
        color: '#ffdd7a',
        textAlign: 'center',
        whiteSpace: 'pre-line',
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '20px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '40px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '50px',
        },
    },

    //SETTINGS
    settingsBox: {
        textAlign: 'center', 
        padding: '10px',
        margin: '25px',
    },
    
}));

const StyledTableCell = withStyles(() => ({
    head: {
        backgroundColor: '#000',
        color: '#fff',
        fontSize: '20px',
    },
    body: {
        fontSize: '18px',
    }
}))(TableCell);

const StyledTableRow = withStyles(() => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f8f8ff'
        },
    },
}))(TableRow);

export { homeStyles, StyledTableCell, StyledTableRow };