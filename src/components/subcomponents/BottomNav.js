import React, { useState } from 'react';
import {Link} from 'react-router-dom';

//Style imports
import {homeStyles} from '../../static/css/homeStyles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// icons
import { Fastfood, Schedule, Create, DateRange } from '@material-ui/icons';

const BottomNav = () => {
    const styles = homeStyles();
    const pathname = window.location.pathname;
    const [value, setValue] = useState(pathname);

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {setValue(newValue)}}
            showLabels
            className={styles.bottomNav}
        >
            <BottomNavigationAction component={Link} to={'/admin/home'} value={'/admin/home'} label='ORDERS/订单' icon={<Fastfood />} />
            <BottomNavigationAction component={Link} to={'timesheet'} value={'timesheet'} label='TIMETABLE/时间表' icon={<Schedule />} />
            <BottomNavigationAction component={Link} to={'/'} value={'/'} label='HOURS/员工工作时间' icon={<DateRange />} />
            <BottomNavigationAction component={Link} to={'/'} value={'/'} label='PLACE ORDER/下订单' icon={<Create />} />
            
        </BottomNavigation>
    )
}

export default BottomNav;