import { makeStyles, withStyles } from '@material-ui/core/styles';

const menuStyles = makeStyles(({spacing}) => ({
    //LAYOUT
    menuLayout: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        overflowX: 'hidden',
        minWidth: '100%',
    },
    header: {
        lineHeight: '0.05em',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '5%'
    },
    foodLayout: {
        marginTop: '15vh'
    },
    switchLayout: {
        display: 'flex',
        alignItems: 'flex-end',
        marginRight: '-5vw'
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
}));

export {menuStyles}