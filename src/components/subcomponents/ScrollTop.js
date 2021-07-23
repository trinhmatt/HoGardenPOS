import React from 'react';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

const ScrollTop = (props) => {
    const { children } = props;
    const styles = menuStyles();

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#top-anchor');
        
        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role='presentation' className={styles.toTopArrow}>
                {children}
            </div>
        </Zoom>
    )
}

export default ScrollTop;