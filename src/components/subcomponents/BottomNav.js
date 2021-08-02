import React, { useState } from 'react';
import { withRouter } from "react-router";
import { firebase } from '../../firebase/firebase';

//Style imports
import {homeStyles} from '../../static/css/homeStyles';

//Material ui imports
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';

// icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Fastfood from '@material-ui/icons/Fastfood';
import Schedule from '@material-ui/icons/Schedule';
import Create from '@material-ui/icons/Create';
import DateRange from '@material-ui/icons/DateRange';

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

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                history.push('/admin')
            })
            .catch(err => console.log(err));
    }
    return (
        <BottomNavigation
            value={value}
            onChange={handleChange}
            showLabels
            className={styles.bottomNav}
        >
            <BottomNavigationAction value='orders' onClick={() => navigateTo('/admin/orders')} label='ORDERS/订单' icon={<Fastfood />} />
            <BottomNavigationAction value='timesheet'  onClick={() => navigateTo('/admin/timesheet')} label='SIGNIN/登录和退出' icon={<Schedule />} />
            <BottomNavigationAction onClick={() => navigateTo('/')} label='HOURS/员工工作时间' icon={<DateRange />} />
            <BottomNavigationAction onClick={() => navigateTo('/order/admin')} label='PLACE ORDER/下订单' icon={<Create />} />
            <BottomNavigationAction onClick={signOut} label='SIGN OUT/登出' icon={<ExitToAppIcon />}/>
            
        </BottomNavigation>
    )
}

export default withRouter(BottomNav);