import { makeStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const homeStyles = makeStyles(({spacing}) => ({

    // BACKGROUND
    homebg: {
        background: '#667db6',  /* fallback for old browsers */
        background: '-webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',  /* Chrome 10-25, Safari 5.1-6 */
        background: 'linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6)',/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */    
        overflow: 'auto',
        width: '100vw',
        height: '100vh',
        fontFamily: ['M PLUS Rounded 1c', 'sans-serif'].join(',')
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

    // TITLE
    homeTitle: {
        fontWeight: '400',
        color: '#fff',
        lineHeight: '1em',
        margin: 0,
        '@media screen and (orientation: portrait)': {
            fontSize: '7vh',
        },
        '@media screen and (orientation: landscape)': {
            fontSize: '10vh'
        },
    },
    homeTitle2: {
        fontWeight: '400',
        color: '#fff',
        lineHeight: '1em',
        '@media screen and (orientation: portrait)': {
            fontSize: '12vh',
            marginTop: '-3%',
        },
        '@media screen and (orientation: landscape)': {
            fontSize: '17vh',
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
        borderRadius: '15px',
        '@media screen and (orientation: portrait)': {
            width: '80vw',
            height: '40vh',
            marginTop: '5%',
        },
        '@media screen and (orientation: landscape)': {
            width: '50vw',
            height: '70vh',
        },
        '@media screen and (min-width: 760px) and (orientation: portrait)': {
            width: '50vw',
            height: '27vh',
            marginTop: '25%',
        },
        '@media screen and (min-width: 760px) and (orientation: landscape)': {
            width: '35vw',
            height: '35vh',
            marginTop: '25%',
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
        width: '100% !important',
    },

    //TABLE
    tableWrapper: {
        transform: 'scale(0.8)',
        margin: '0 auto',
        marginTop: '-5%'
    },

    //NAV
    bottomNav: {
        justifyContent: 'space-evenly',
        position: 'fixed',
        bottom: '0%',
        width: '100%'
    },

    //ORDERS
    orderLayout: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    orderCard: {
        width: '40%',
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        overflowX: 'hidden',
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