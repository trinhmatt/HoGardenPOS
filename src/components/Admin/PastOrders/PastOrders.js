import React, { useState } from 'react';
import isBetween from 'dayjs/plugin/isBetween';
import dayjs from 'dayjs';
import { withRouter } from 'react-router';

import DayJSUtils from '@date-io/dayjs'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';

import PastOrderTable from './PastOrderTable';
import database from '../../../firebase/firebase';
import { authConsts } from '../../../static/constants/auth-constants';

const PastOrders = () => {
    dayjs.extend(isBetween);
    const [state, setState] = useState({
                                startDate: dayjs(),
                                endDate: dayjs(),
                                orderTables: []
                            });
    
    const getOrders = () => {
        database.ref('old_orders').once('value')
            .then( snapshot => {
                const allOrders = snapshot.val();

                if (allOrders && Object.keys(allOrders).length > 0) {
                    let orderTables = [];
                    for (const date in allOrders) {
                        if (dayjs(date, authConsts.DATE).isBetween(state.startDate, state.endDate, 'day', '[]')) {
                            orderTables.push(<PastOrderTable data={{orders: allOrders[date], date}}/>)
                        }
                    }
                    setState({...state, orderTables})
                }
            })
    }
    const handleStartDate = (startDate) => {
        setState({...state, startDate});
    }
    const handleEndDate = (endDate) => {
        setState({...state, endDate});
    }
    return (
        <div>
            <h2>Past Orders</h2>
            <div>
                <MuiPickersUtilsProvider utils={DayJSUtils}>
                    <DatePicker
                        label={"Start"}
                        value={state.startDate}
                        onChange={handleStartDate}
                        disableFuture={true}
                        maxDate={state.endDate}
                        format='YYYY/MM/DD'
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DayJSUtils}>
                    <DatePicker
                        label={"End"}
                        value={state.endDate}
                        onChange={handleEndDate}
                        disableFuture={true}
                        format='YYYY/MM/DD'
                    />
                </MuiPickersUtilsProvider>
                <button onClick={getOrders}>GET ORDERS</button>
            </div>
            <div>
                {state.orderTables}
            </div>
        </div>
    )
}

export default withRouter(PastOrders);