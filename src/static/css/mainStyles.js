import { makeStyles } from '@material-ui/core/styles';

//Image
import bkgrnd from '../images/home.jpeg';
import bkgrnd2 from '../images/lemontea.jpeg';
import bkgrnd3 from '../images/milktea.jpeg';

const mainStyles = makeStyles(({spacing}) => ({
    fullPage: {
        minWidth: window.screen.width,
        minHeight: window.screen.height,
        position: 'relative',
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center', 
    },
    centered: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homePage: {
        width: '100vw',
        overflowX: 'hidden',
    },

    //title
    title: {
        fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
        color: '#ffdd7a',
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '40px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '80px',
            letterSpacing: '20px',
        },
    },
    titleBackground: {
        background: '#000428',
        background: '-webkit-linear-gradient(to bottom, #004e92, #000428)',  
        background: 'linear-gradient(to bottom, #004e92, #000428)',
        //phone
        '@media (min-width: 375px)': { 
            height: '15vh',
        },
        //ipad+
        '@media (min-width: 760px)': {
            height: '10vh',
        },
    },
    titleRightLayout: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '2em',
    },
    titleRight: {
        fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
        color: '#ffdd7a',
        fontSize: '25px',
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '10px',
            lineHeight: '1.5em',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '25px',
            lineHeight: '1em',
        },
    },
    menuTitle: {
        fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
        color: '#ffdd7a',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: '500',
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '35px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '60px',
        },
    },

    //parallax
    parallaxBackground: {
        backgroundImage: `url(${bkgrnd})`,
        minHeight: '600px',
        minWidth: '160vw',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    parallaxBackground2: {
        backgroundImage: `url(${bkgrnd2})`,
        minHeight: '600px',
        minWidth: '100vw',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    parallaxBackground3: {
        backgroundImage: `url(${bkgrnd3})`,
        minHeight: '600px',
        minWidth: '100vw',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    afterBackground: {
        padding: '5%',
        background: '#005C97', 
        background: '-webkit-linear-gradient(to bottom, #363795, #005C97)', 
        background: 'linear-gradient(to bottom, #363795, #005C97)', 
        //phone
        '@media (min-width: 375px)': { 
            minHeight: '700px',
        },
        //ipad+
        '@media (min-width: 760px)': { 
            minHeight: '2000px',
        },
    },

    //map
    mapouter: {
        position: 'relative',
        textAlign: 'right',
        padding: '0 !important',
        //phone
        '@media (min-width: 375px)': {  
            height: '130px',
            width: '200px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            height: '330px',
            width: '600px',
        },
    },
    gmap_canvas: {
        overflow: 'hidden',
        background: 'none!important',
        //phone
        '@media (min-width: 375px)': {  
            height: '130px',
            width: '200px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            height: '330px',
            width: '600px',
        },
    },
    mapBackground: {
        width: '100vw',
        backgroundColor: '#000',
        padding: '2%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    mapSmall: {
        fontFamily: ['"M PLUS Rounded 1c"', 'sans-serif'].join(','),
        color: '#ffdd7a',
        lineHeight: '1.5em',
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '10px',
        },
        //ipad+
        '@media (min-width: 760px)': { 
            fontSize: '15px',
        },
    },

    //menu
}))

export { mainStyles };