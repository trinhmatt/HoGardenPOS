import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";

//Style imports
import {homeStyles} from '../../static/css/homeStyles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// icons
import { Fastfood, Schedule, Create, DateRange } from '@material-ui/icons';

const BottomNav = (props) => {
    const styles = homeStyles();
    const { history } = props;
    const [value, setValue] = useState('orders');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const navigateTo = (pathname) => {
        return history.push(pathname);
    }
    //TODO: PUT IN PRIVATE ROUTER
    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={styles.bottomNav}
        >
            <BottomNavigationAction value='orders' onClick={() => navigateTo('orders')} label='ORDERS/订单' icon={<Fastfood />} />
            <BottomNavigationAction value='timesheet'  onClick={() => navigateTo('timesheet')} label='SIGNIN/登录和退出' icon={<Schedule />} />
            <BottomNavigationAction onClick={() => navigateTo('/')} label='HOURS/员工工作时间' icon={<DateRange />} />
            <BottomNavigationAction onClick={() => navigateTo('/')} label='PLACE ORDER/下订单' icon={<Create />} />
            
        </BottomNavigation>
    )
}

export default withRouter(BottomNav);