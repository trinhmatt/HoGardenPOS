import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';

import { authConsts } from '../../static/constants/auth-constants';
import database from '../../firebase/firebase';
import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Grid from '@material-ui/core/Grid';

const AdminPlaceOrder = (props) => {
    const styles = menuStyles();
    let tableNumber = props.match.params.number;
    const { cart } = props;
    const isNewOrder = cart.id === undefined;
    const completeOrder = () => {
        database.ref(`orders/${dayjs().format(authConsts.DATE)}`).update({[cart.id]: ""})
            .then( () => props.history.push('/admin/tables'))
            .catch( err => console.log(err));
    }
    return (
        <div>
            <Grid container spacing={0} style={{}}>
                <Grid item xs={4} spacing={0} style={{overflow: 'auto', height: '100vh',backgroundColor: '#7f9877'}}>
                    <div item className={styles.authTableNumber}>
                        table {tableNumber}
                    </div>
                    {!isNewOrder && <button onClick={completeOrder}>COMPLETE</button>}
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

const mapStateToProps = state => ({
    cart: state.cart
})

export default withRouter(connect(mapStateToProps)(AdminPlaceOrder));