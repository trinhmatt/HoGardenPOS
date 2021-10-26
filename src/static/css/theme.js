import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#13378D',
            dark: '#0c2359',
            darker: '#0a1c48',
            light: '#1e58da',
            lighter: '#91aff0',
        },
        secondary: {
            main: '#FFDA64',
            dark: '#ffcc29',
            darker: '#ffc302',
            light: '#ffe89f',
            lighter: '#fff6da',
        },
    }
});

export default theme;