import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

//Image
import home from '../images/home.jpeg';

const homeStyles = makeStyles(() => ({

    // BACKGROUND
    homebg: {
        background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',   
        overflow: 'auto',
        width: '100vw',
        height: '100vh',
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(',')
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
        '@media screen and (orientation: portrait)': {
            width: '80vw',
            height: '50vh',
        },
        '@media screen and (orientation: landscape)': {
            width: '55vw',
            height: '80vh',
        },
        '@media screen and (min-width: 760px) and (orientation: portrait)': {
            width: '55vw',
            height: '35vh',
        },
        '@media screen and (min-width: 760px) and (orientation: landscape)': {
            width: '40vw',
            height: '42vh',
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
        transform: 'scale(0.8)',
        margin: '0 auto',
        marginTop: '-5%'
    },
    dateWrapper: {
        position: 'fixed',
        top: '0',
        display: 'flex',
        flexDirection: 'row',
        padding: '1%',
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
    completeButton: {
        color: '#32cd59',
    },

    //TABLES
    hTable: {
        width: '100px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    smolhTable: {
        width: '80px',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    vTable: {
        width: '50px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundTable: {
        borderRadius: '50%',
        width: '100px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderTakenTable: {
        backgroundColor: '#ffaa00'
    }
    
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