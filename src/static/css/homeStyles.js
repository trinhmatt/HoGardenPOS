import { makeStyles } from '@material-ui/core/styles';


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
        padding: '20px',
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
        fontSize: '50px',
        color: '#fff',
        lineHeight: '1em',
    },
    homeTitle2: {
        fontWeight: '400',
        color: '#fff',
        lineHeight: '1em',
        fontSize: '100px',
        marginTop: '-4%',
    },

    // BUTTONS
    orderBtn: {
        backgroundColor: '#ffa500 !important',
        color: '#fff !important',
        transform: 'scale(2)',
    },

    // CARD
    loginCard: {
        width: 500,
        height: 350,
        borderRadius: spacing(2),
        marginTop: '-10%'
    },

    // INPUT
    inputField: {
        width: '300px !important',
    }
    
}))

export { homeStyles };