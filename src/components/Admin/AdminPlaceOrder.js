import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Grid from '@material-ui/core/Grid';

const AdminPlaceOrder = (props) => {
    const styles = menuStyles();
    let tableNumber = props.match.params.number;
    return (
        <div>
            <Grid container spacing={0} style={{}}>
                <Grid item xs={4} spacing={0} style={{overflow: 'auto', height: '100vh',backgroundColor: '#7f9877'}}>
                   
                    <div item className={styles.authTableNumber}>
                        table {tableNumber}
                    </div>
                    <Cart />
                </Grid>
                <Grid item xs={8} container spacing={0} style={{overflow: 'auto', height: '100vh'}}>
                    <Grid item className={styles.cartLayout}>
                        <Menu />
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(connect()(AdminPlaceOrder));