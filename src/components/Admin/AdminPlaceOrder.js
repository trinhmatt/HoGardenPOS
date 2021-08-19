import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Menu from '../Menu/Menu';

const AdminPlaceOrder = (props) => {
    return (
        <div>
            <div>
                <h2>Menu</h2>
                <Menu />
            </div>
        </div>
    )
}

export default withRouter(connect()(AdminPlaceOrder));