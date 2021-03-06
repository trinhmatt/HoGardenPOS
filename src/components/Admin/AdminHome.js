// react imports
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

// style imports
import Button from '@material-ui/core/Button';
import '../../static/css/home.css';

// icons
import { Fastfood, Schedule } from '@material-ui/icons';

const AdminHome = () => {
    const history = useHistory();

    const pushToPage = (e) => {
        history.push(`${e.currentTarget.value}`);
    }

    return (
        <div className="home-bg">
            <div className="header">
                <h1 className="home-title">welcome</h1>
                <h2 className="home-title2">半島餐廳</h2>
            </div>
            <br /><br />
            <div className="center-wrapper">
                <Button 
                    variant="contained" 
                    startIcon={<Fastfood />} 
                    className="order-btn"
                    value="orders"
                    onClick={pushToPage}>
                        Orders/食品订单
                </Button>
                </div>
                <div className="center-wrapper">
                <Button 
                    variant="contained" 
                    startIcon={<Schedule />} 
                    className="order-btn"
                    value="timesheet"
                    onClick={pushToPage}>
                        Timetable/时间表
                </Button>
            </div>
        </div>
    )
}

export default AdminHome;