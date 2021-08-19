import React, { useState, useEffect } from 'react';

import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

import DayJSUtils from '@date-io/dayjs'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';

import database from '../../firebase/firebase';
import { authConsts } from '../../static/constants/auth-constants';

//Style imports
import { homeStyles, StyledTableRow, StyledTableCell } from '../../static/css/homeStyles';

//Material ui imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const WeeklyTimeSheet = (props) => {
    dayjs.extend(isBetween);
    dayjs.extend(duration); 
    const [state, setState] = useState({
                                startDate: dayjs(),
                                endDate: dayjs(),
                                employeeTableRows: [] 
                             })
    const handleStartDate = (newDate) => {
        setState({...state, startDate: newDate});
    }
    const handleEndDate = (newDate) => {
        setState({...state, endDate: newDate});
    }
    const getHours = () => {
        database.ref('timesheet').once('value')
            .then( snapshot => {
                const timesheets = snapshot.val();
                let timesheetsInRange = [];
                let employeeHours = {};
                let employeeTableRows = [];

                if (timesheets && Object.keys(timesheets).length > 0) {
                    // Add all timesheets that are for days in range to array
                    for (const day in timesheets) {
                        if (dayjs(day, authConsts.DATE).isBetween(state.startDate, state.endDate, 'day', '[]')) {
                            timesheetsInRange.push(timesheets[day]);
                        }
                    }
                    // Add up the hours inside each timesheet in range
                    for (let i = 0; i < timesheetsInRange.length; i++) {
                        for (const employee in timesheetsInRange[i]) {
                            const start = dayjs(timesheetsInRange[i][employee].in, "HH:mm"); 
                            let end;
                            let isFlagged = false;
                            if (timesheetsInRange[i][employee].out === undefined) {
                                end = start.add(9, 'hour');
                                isFlagged = true;
                            } else {
                                end = dayjs(timesheetsInRange[i][employee].out, "HH:mm");
                            }
                            const hours = dayjs.duration(end.diff(start)).asMinutes();
                            if (employeeHours[employee] === undefined) {
                                employeeHours[employee] = {};
                                employeeHours[employee].hours = hours;
                            } else {
                                employeeHours[employee].hours += hours;
                            }
                            // Flagged means the employee forgot to sign out 
                            if (isFlagged && !employeeHours[employee].isFlagged) {
                                employeeHours[employee].isFlagged = isFlagged;
                            }
                        }
                    }
                    // Create the DOM elements to render to user
                    if (Object.keys(employeeHours).length > 0) {
                        for (const employee in employeeHours) {
                            employeeTableRows.push(
                                <StyledTableRow key={employee}>
                                    <StyledTableCell align="left" component="th" scope="row">{employee}</StyledTableCell>
                                    <StyledTableCell align="right">{(employeeHours[employee].hours/60).toFixed(2)}</StyledTableCell>
                                    <StyledTableCell align="right">{employeeHours[employee].isFlagged ? "yes" : "no"}</StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    }
                    setState({...state, employeeTableRows});
                }
            })
            .catch( error => setState({...state, error}) )
    }
    return (
        <div>
            <h2>Weekly Time Sheet</h2>
            <div>{state.error}</div>
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
                <button disabled={state.endDate.isBefore(state.startDate)} onClick={getHours}>Get Hours</button>
            </div>
            <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>EMPLOYEE/员工姓名</StyledTableCell>
                                <StyledTableCell align="center">HOURS</StyledTableCell>
                                <StyledTableCell align="center">Flagged</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.employeeTableRows}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default WeeklyTimeSheet;