import React from 'react';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Zoom from '@material-ui/core/Zoom';

const CartButton = (props) => {
    const { children, cartOpen } = props;
    const styles = menuStyles();
    
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: -10,
    });

    const handleClick = () => {
        cartOpen(true);
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role='presentation' className={styles.toTopArrow}>
                {children}
            </div>
        </Zoom>
    )
}

export default CartButton;