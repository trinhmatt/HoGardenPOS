import { makeStyles } from '@material-ui/core/styles';

const mainStyles = makeStyles(({spacing}) => ({
    fullPage: {
        minWidth: window.screen.width,
        minHeight: window.screen.height,
        position: 'relative',
        display: 'flex',  
        justifyContent:'center', 
        alignItems:'center', 
    },
}))

export { mainStyles };