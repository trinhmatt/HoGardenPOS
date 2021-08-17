import { makeStyles } from '@material-ui/core/styles';

//Image
import bkgrnd from '../images/home.jpeg';
import bkgrnd2 from '../images/lemontea.jpeg';
import bkgrnd3 from '../images/milktea.jpeg';
import bkgrnd4 from '../images/home2.jpeg';
import bkgrnd5 from '../images/home3.jpeg';
import bkgrnd6 from '../images/home4.jpeg';
import bkgrnd7 from '../images/home5.jpeg';
import bkgrnd8 from '../images/home6.jpeg';
import bkgrnd9 from '../images/home7.jpeg';

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
            fontSize: '30px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '50px',
            letterSpacing: '15px',
        },
        //desktop
        '@media (min-width: 960px)': {
            fontSize: '60px',
            letterSpacing: '20px',
        },
    },
    titleBackground: {
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
        //phone
        '@media (min-width: 375px)': {  
            fontSize: '10px',
            lineHeight: '1.5em',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            fontSize: '20px',
            lineHeight: '1.3em',
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
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground2: {
        backgroundImage: `url(${bkgrnd2})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground3: {
        backgroundImage: `url(${bkgrnd3})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground4: {
        backgroundImage: `url(${bkgrnd4})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground5: {
        backgroundImage: `url(${bkgrnd5})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground6: {
        backgroundImage: `url(${bkgrnd6})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground7: {
        backgroundImage: `url(${bkgrnd7})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground8: {
        backgroundImage: `url(${bkgrnd8})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parallaxBackground9: {
        backgroundImage: `url(${bkgrnd9})`,
        minHeight: '600px',
        maxWidth: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    afterBackground: {
        padding: '5%',
        backgroundAttachment: 'fixed',
        background: 'linear-gradient(to bottom, #000428, #004e92)',
        //phone
        '@media (min-width: 375px)': { 
            minHeight: '700px',
        },
        //ipad+
        '@media (min-width: 760px)': { 
            minHeight: '1200px',
        },
        //desktop
        '@media (min-width: 960px)': {
            minHeight: '2000px',
        },
    },

    //map
    mapouter: {
        position: 'relative',
        textAlign: 'right',
        padding: '0 !important',
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
            width: '450px',
        },
        //desktop
        '@media (min-width: 960px)': {
            height: '330px',
            width: '600px',
        },
    },
    gmap_iframe: {
        //phone
        '@media (min-width: 375px)': {  
            height: '130px',
            width: '200px',
        },
        //ipad+
        '@media (min-width: 760px)': {  
            height: '330px',
            width: '450px',
        },
        //desktop
        '@media (min-width: 960px)': {
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

    //buttons
    btn: {
        backgroundColor: '#000 !important',
        color: '#ffdd7a !important',
        //phone
        '@media (min-width: 375px)': {  
            width: '60%',
        },
        //ipad+
        '@media (min-width: 760px)': { 
            width: '30%',
        },
    },
    menuIcon: {
        borderRadius: '50%',
        backgroundColor: '#fff',
        color: '#033E7C',
        //phone
        '@media (min-width: 375px)': {  
            padding: '15%',
        },
        //ipad+
        '@media (min-width: 760px)': { 
            padding: '30%',
        },
    },
    menuList: {
        backgroundColor: '#043F7D',
        color: '#FFDD7A',
    }
}))

export { mainStyles };