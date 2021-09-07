import React, { useState } from 'react';
import { withRouter } from "react-router";
import { firebase } from '../../firebase/firebase';
import { connect } from 'react-redux';
import { logOut } from '../../redux/actions/auth-actions';

//Style imports
import {homeStyles} from '../../static/css/homeStyles';

//Material ui imports
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Fastfood from '@material-ui/icons/Fastfood';
import Schedule from '@material-ui/icons/Schedule';
import Create from '@material-ui/icons/Create';
import DateRange from '@material-ui/icons/DateRange';
import DesktopWindowsIcon from '@material-ui/icons/DesktopWindows';
import SettingsIcon from '@material-ui/icons/Settings';

const BottomNav = (props) => {
    const styles = homeStyles();
    const { history } = props;
    // Each nav item's value = the last word in the route (tables, takeout, orders, etc.)
    const [value, setValue] = useState( (history.location.pathname.substring(history.location.pathname.lastIndexOf("/")+1)) );

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const navigateTo = (pathname) => {
        return history.push(pathname);
    }

    const signOut = () => {
        firebase.auth().signOut()
            .then(() => {
                props.logout();
                history.push('/admin');
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
            <BottomNavigationAction value='tables' onClick={() => navigateTo('/admin/tables')} label='TABLES/桌' icon={<DesktopWindowsIcon />} />
            <BottomNavigationAction value='takeout' onClick={() => navigateTo('/admin/takeout')} label='TAKEOUT/外賣' icon={<Create />} />
            <BottomNavigationAction value='orders' onClick={() => navigateTo('/admin/orders')} label='ORDERS/订单' icon={<Fastfood />} />
            <BottomNavigationAction value='timesheet'  onClick={() => navigateTo('/admin/timesheet')} label='SIGNIN/登录和退出' icon={<Schedule />} />
            <BottomNavigationAction value='weekly' onClick={() => navigateTo('/admin/timesheet/weekly')} label='HOURS/员工工作时间' icon={<DateRange />} />
            <BottomNavigationAction value='settings' onClick={() => navigateTo('/admin/settings')} label='SETTINGS/設置' icon={<SettingsIcon />} />
            <BottomNavigationAction onClick={signOut} label='SIGN OUT/登出' icon={<ExitToAppIcon />}/>
            
        </BottomNavigation>
    )
}

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logOut())
})

export default connect(undefined, mapDispatchToProps)(withRouter(BottomNav));