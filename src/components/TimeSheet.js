import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { employees } from '../static/constants/employee-constants';
import database from '../firebase/firebase';

//Style imports
import { homeStyles, StyledTableRow, StyledTableCell } from '../static/css/homeStyles';

//Material ui imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


const TimeSheet = () => {
    const [state, setState] = useState({
        employeeItems: [],
        selectedEmployee: "",
        currentDayObj: {}
    });
    // On component load, fetch timesheet for current day if one exists
    useEffect(() => {
        database.ref("timesheet").once("value")
            .then(snapshot => {
                const currentDayString = dayjs().format("MMMM_D");
                let allDaysObj = snapshot.val();
                // Check if object for current day exists yet and set state
                let currentDayObj = !!allDaysObj[currentDayString] ? allDaysObj[currentDayString] : {};
                setState({ ...state, currentDayObj, currentDayString })
            })
            .catch(err => console.log(err))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Whenever the local time sheet changes, push the changes to firebase
    useEffect(() => {
        if (Object.keys(state.currentDayObj).length > 0) {
            database.ref(`timesheet/${state.currentDayString}`).set(state.currentDayObj, err => console.log(err));
        }
    }, [state.currentDayObj]) // eslint-disable-line react-hooks/exhaustive-deps

    // Update local time sheet
    const updateClockTime = (isClockOut, employee) => {
        const currentTime = dayjs().format("HH:mm");
        let selectedEmployeeObj = {},
            currentDayObj = { ...state.currentDayObj };
        if (isClockOut) {
            selectedEmployeeObj = { ...state.currentDayObj[employee], out: currentTime };
            currentDayObj[employee] = selectedEmployeeObj;
        } else {
            selectedEmployeeObj = { in: currentTime };
            currentDayObj[employee] = selectedEmployeeObj;
        }
        setState({ ...state, currentDayObj, renderClockOut: !isClockOut });
    }

    //Styles
    const styles = homeStyles();
    return (
        <div className={styles.homebg}>
            <div className="header">
                <h1 className={styles.subTitle}>timetable</h1>
                <h2 className={styles.subTitle2}>时间表</h2>
                <h1 className={styles.subTitle} style={{marginTop: '-3%'}}>today/今天: <b>{dayjs().format("YYYY/MM/DD")}</b></h1>
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
                                const employeeStr = employee.replace(/ /g, '');
                                const employeeObj = state.currentDayObj[employeeStr] ? state.currentDayObj[employeeStr] : {};
                                let actionButton;
                                if (!!state.currentDayObj[employeeStr] && state.currentDayObj[employeeStr].in) {
                                    actionButton = <Button variant="contained" color="primary" onClick={() => updateClockTime(true, employeeStr)}>CLOCK OUT/登出</Button>
                                } else {
                                    actionButton = <Button variant="contained" color="primary" onClick={() => updateClockTime(false, employeeStr)}>CLOCK IN/登入</Button>
                                }
                                return (
                                    <StyledTableRow key={employeeStr}>
                                        <StyledTableCell align="left" component="th" scope="row">{employee}</StyledTableCell>
                                        <StyledTableCell align="right">{employeeObj.in}</StyledTableCell>
                                        <StyledTableCell align="right">{employeeObj.out}</StyledTableCell>
                                        <StyledTableCell align="center">{actionButton}</StyledTableCell>
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