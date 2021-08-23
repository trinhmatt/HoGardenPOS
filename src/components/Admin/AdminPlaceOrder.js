import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Menu from '../Menu/Menu';
import Cart from '../Cart/Cart';

const AdminPlaceOrder = (props) => {
    return (
        <div>
            <div>
                <Cart />
            </div>
            <div>
                <h2>Menu</h2>
                <Menu />
            </div>
        </div>
    )
}

export default withRouter(connect()(AdminPlaceOrder));