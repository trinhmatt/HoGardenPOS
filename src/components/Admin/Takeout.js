import React from 'react';
import Orders from './Orders/Orders';
import { withRouter } from 'react-router';

const Takeout = (props) => {
    const startTakeoutOrder = () => {
        props.history.push('/admin/place-order/takeout')
    }
    return (
        <div>
            <button onClick={startTakeoutOrder}>PLACE TAKEOUT ORDER</button>
            <Orders isTakeout={true} />
        </div>
    )
}

export default withRouter(Takeout);