import React from 'react';
import Orders from './Orders/Orders';
import { withRouter } from 'react-router';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

//Material ui imports
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';

const Takeout = (props) => {
    const styles = homeStyles();
    const startTakeoutOrder = () => {
        props.history.push('/admin/place-order/takeout')
    }
    return (
        <div>
            <div className={styles.takeoutBtnWrapper}>
                <Button
                    onClick={startTakeoutOrder}
                    variant='contained'
                    size='large'
                    startIcon={<CreateIcon />}
                    className={styles.takeoutBtn}
                >
                    下外賣訂單
                </Button>
            </div>
            <Orders isTakeout={true} />
        </div>
    )
}

export default withRouter(Takeout);