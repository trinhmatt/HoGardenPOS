import React, { useState, useRef } from 'react';

import isBetween from 'dayjs/plugin/isBetween';
import duration from 'dayjs/plugin/duration';
import dayjs from 'dayjs';

import DayJSUtils from '@date-io/dayjs'; // choose your lib
import {
    DatePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';

import database from '../../../firebase/firebase';
import { authConsts } from '../../../static/constants/auth-constants';
import EmployeeWeeklyTimeSheet from './EmployeeWeeklyTimeSheet';

//Style imports
import { homeStyles, StyledTableRow, StyledTableCell } from '../../../static/css/homeStyles';

//Material ui imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const WeeklyTimeSheet = () => {
    const styles = homeStyles();
    dayjs.extend(isBetween);
    dayjs.extend(duration); 
    const [state, setState] = useState({
                                startDate: dayjs(),
                                endDate: dayjs(),
                                employeeTableRows: [],
                                isSingleEmployeeOpen: false,
                                singleEmployeeHours: "" 
                             });
    
    // Need this so that the callback (viewEmployeeHours) passed to each TableRow in getHours() has access to the most current state
    const currentState = useRef();
    currentState.current = state.employeeTableRows;

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
                let allEmployeeHours = {};
                let employeeTableRows = [];

                if (timesheets && Object.keys(timesheets).length > 0) {
                    // Add all timesheets that are for days in range to array
                    for (const day in timesheets) {
                        if (dayjs(day, authConsts.DATE).isBetween(state.startDate, state.endDate, 'day', '[]')) {
                            timesheetsInRange.push({timesheet: timesheets[day], day});
                        }
                    }

                    // For each employee, populate object with each day as a key and the hours as the value
                    for (let i = 0; i < timesheetsInRange.length; i++) {
                        for (const employee in timesheetsInRange[i].timesheet) {
                            const start = dayjs(timesheetsInRange[i].timesheet[employee].in, "HH:mm"); 
                            let end;
                            let isFlagged = false;

                            if (timesheetsInRange[i].timesheet[employee].out === undefined) {
                                end = start.add(9, 'hour');
                                isFlagged = true;
                            } else {
                                end = dayjs(timesheetsInRange[i].timesheet[employee].out, "HH:mm");
                            }

                            const hours = dayjs.duration(end.diff(start)).asMinutes();

                            if (allEmployeeHours[employee] === undefined) {
                                allEmployeeHours[employee] = {hasFlaggedDay: false};
                            } 
                            allEmployeeHours[employee][timesheetsInRange[i].day] = {hours, isFlagged};
                            
                            // Flagged means the employee forgot to sign out 
                            if (isFlagged && !allEmployeeHours[employee].hasFlaggedDay) {
                                allEmployeeHours[employee].hasFlaggedDay = isFlagged;
                            }
                        }
                    }
                    // Create the DOM elements to render to user
                    if (Object.keys(allEmployeeHours).length > 0) {
                        for (const employee in allEmployeeHours) {
                            employeeTableRows.push(
                                <StyledTableRow key={employee} onClick={() => {viewEmployeeHours(employee, allEmployeeHours[employee])}}>
                                    <StyledTableCell align="left" component="th" scope="row">{employee}</StyledTableCell>
                                    <StyledTableCell align="right">{getHoursInRange(allEmployeeHours[employee])}</StyledTableCell>
                                    <StyledTableCell align="right">{allEmployeeHours[employee].hasFlaggedDay ? "yes" : "no"}</StyledTableCell>
                                </StyledTableRow>
                            )
                        }
                    }
                    setState({...state, employeeTableRows});
                }
            })
            .catch( error => setState({...state, error}) )
    }
    const getHoursInRange = (employeeHoursObj) => {
        let minutes = 0;
        for (const key in employeeHoursObj) {
            if (key !== "hasFlaggedDay") {
                minutes += employeeHoursObj[key].hours;
            }
        }
        return (minutes/60).toFixed(2);
    }
    const viewEmployeeHours = (employee, employeeHoursObj) => {
        setState({
            ...state,
            employeeTableRows: currentState.current,
            isSingleEmployeeOpen: true, 
            singleEmployeeHours: <EmployeeWeeklyTimeSheet employee={employee} employeeHours={employeeHoursObj} start={state.startDate} end={state.end} />
        });
    }
    const closeSingleEmployeeModal = () => setState({...state, isSingleEmployeeOpen: false});
    return (
        <div className={styles.homebg}>
             <div className="header">
                <h1 className={styles.subTitle}>past time sheets</h1>
                <h2 className={styles.subTitle2}>過去的時間表</h2>
                <div>
                <div className={styles.dateRangeWrapper}>
                <MuiPickersUtilsProvider utils={DayJSUtils}>
                    <DatePicker
                        label={"Start Date/開始日期"}
                        value={state.startDate}
                        onChange={handleStartDate}
                        disableFuture={true}
                        maxDate={state.endDate}
                        format='YYYY/MM/DD'
                    />
                </MuiPickersUtilsProvider>
                <MuiPickersUtilsProvider utils={DayJSUtils}>
                    <DatePicker
                        label={"End Date/結束日期"}
                        value={state.endDate}
                        onChange={handleEndDate}
                        disableFuture={true}
                        format='YYYY/MM/DD'
                    />
                </MuiPickersUtilsProvider>
                <Button 
                    disabled={state.endDate.isBefore(state.startDate)} 
                    onClick={getHours}
                    variant='contained'
                >
                    Get Hours<br />
                    得到小時
                </Button>
                </div>
            </div>
            </div>
            <div>{state.error}</div>
            
            <div className={styles.tableWrapper}>
                <TableContainer component={Paper}>
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
            <Modal
                style={{backgroundColor: "white"}}
                open={state.isSingleEmployeeOpen}
                onClose={closeSingleEmployeeModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div>
                    {state.singleEmployeeHours}
                </div>
            </Modal>
        </div>
    )
}

export default WeeklyTimeSheet;