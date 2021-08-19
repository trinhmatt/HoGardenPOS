import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DayJSUtils from '@date-io/dayjs'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { employees } from '../../static/constants/employee-constants';
import { authConsts } from '../../static/constants/auth-constants';
import database from '../../firebase/firebase';

//Style imports
import { homeStyles, StyledTableRow, StyledTableCell } from '../../static/css/homeStyles';

//Material ui imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//Icons
import TodayIcon from '@material-ui/icons/Today';

const TimeSheet = () => {
    const currentDayObj = dayjs();
    const [state, setState] = useState({
        dayObj: dayjs(),
        employeeItems: [],
        selectedEmployee: "",
        timesheetObj: {}
    });

    const getTimesheet = () => {
        database.ref("timesheet").once("value")
            .then(snapshot => {
                let allDaysObj = snapshot.val();
                const dayStr = state.dayObj.format(authConsts.DATE);
                // Check if object for current day exists yet and set state
                let timesheet = !!allDaysObj[dayStr] ? allDaysObj[dayStr] : {};
                setState({ ...state, timesheetObj: timesheet})
            })
            .catch(err => console.log(err))
    }

    // On component load, fetch timesheet for current day if one exists
    useEffect(() => {
        getTimesheet();
    }, [state.dayObj]) // eslint-disable-line react-hooks/exhaustive-deps

    // Whenever the local time sheet changes, push the changes to firebase
    useEffect(() => {
        const currentDay = dayjs().format(authConsts.DATE);
        if (Object.keys(state.timesheetObj).length > 0 && state.dayObj.format(authConsts.DATE) === currentDay) {
            database.ref(`timesheet/${state.dayObj.format(authConsts.DATE)}`).set(state.timesheetObj, err => console.log(err));
        }
    }, [state.timesheetObj]) // eslint-disable-line react-hooks/exhaustive-deps


    // Update local time sheet
    const updateClockTime = (isClockOut, employee) => {
        const currentTime = dayjs().format("HH:mm");
        let selectedEmployeeObj = {},
            timesheetObj = { ...state.timesheetObj };
        if (isClockOut) {
            selectedEmployeeObj = { ...state.timesheetObj[employee], out: currentTime };
            timesheetObj[employee] = selectedEmployeeObj;
        } else {
            selectedEmployeeObj = { in: currentTime };
            timesheetObj[employee] = selectedEmployeeObj;
        }
        setState({ ...state, timesheetObj, renderClockOut: !isClockOut });
    }

    const handleDateChange = (newDate) => {
        setState({...state, dayObj: newDate})
    }

    //Styles
    const styles = homeStyles();
    return (
        <div className={styles.homebg}>
            <div className="header">
                <h1 className={styles.subTitle}>timetable</h1>
                <h2 className={styles.subTitle2}>时间表</h2>
                <h1 className={styles.subTitle} style={{marginTop: '-3%'}}>today/今天: <b>{state.dayObj.format("YYYY/MM/DD")}</b></h1>
            </div>
            <div className={styles.dateWrapper}>
                <TodayIcon fontSize='large'/>
                <MuiPickersUtilsProvider utils={DayJSUtils}>
                    <DatePicker
                        value={state.dayObj}
                        onChange={handleDateChange}
                        format='YYYY/MM/DD'
                    />
                </MuiPickersUtilsProvider>
            </div>
            <div className={styles.tableWrapper}>
                <TableContainer component={Paper}>
                    <Table aria-label="employee table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>EMPLOYEE/员工姓名</StyledTableCell>
                                <StyledTableCell align="right">IN/签到时间</StyledTableCell>
                                <StyledTableCell align="right">OUT/退出时间</StyledTableCell>
                                <StyledTableCell align="center">ACTION/行动</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {employees.map(employee => {
                                const isCurrentDay = state.dayObj.isSame(currentDayObj, 'day');
                                const employeeStr = employee.replace(/ /g, '');
                                const employeeObj = state.timesheetObj[employeeStr] ? state.timesheetObj[employeeStr] : {};
                                let actionButton;
                                if (!!state.timesheetObj[employeeStr] && state.timesheetObj[employeeStr].in) {
                                    actionButton = <Button variant="contained" color="primary" onClick={() => updateClockTime(true, employeeStr)}>CLOCK OUT/登出</Button>
                                } else {
                                    actionButton = <Button variant="contained" color="primary" onClick={() => updateClockTime(false, employeeStr)}>CLOCK IN/登入</Button>
                                }
                                return (
                                    <StyledTableRow key={employeeStr}>
                                        <StyledTableCell align="left" component="th" scope="row">{employee}</StyledTableCell>
                                        <StyledTableCell align="right">{employeeObj.in}</StyledTableCell>
                                        <StyledTableCell align="right">{employeeObj.out}</StyledTableCell>
                                        <StyledTableCell align="center">{isCurrentDay && actionButton}</StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

export default TimeSheet;