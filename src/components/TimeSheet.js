import React, { useState, useEffect} from 'react';
import dayjs from 'dayjs';
import { employees } from '../static/constants/employee-constants';
import database from '../firebase/firebase';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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
            .then( snapshot => {
                const currentDayString = dayjs().format("MMMM_D");
                let allDaysObj = snapshot.val();
                // Check if object for current day exists yet and set state
                let currentDayObj = !!allDaysObj[currentDayString] ? allDaysObj[currentDayString] : {};
                setState({...state, currentDayObj, currentDayString})
            })
            .catch( err => console.log(err))
    }, [])

    // Whenever the local time sheet changes, push the changes to firebase
    useEffect(() => {
        if (Object.keys(state.currentDayObj).length > 0) {
            database.ref(`timesheet/${state.currentDayString}`).set(state.currentDayObj, err => console.log(err));
        }
    }, [state.currentDayObj])

    // Update local time sheet
    const updateClockTime = (isClockOut, employee) => {
        const currentTime = dayjs().format("HH:mm");
        let selectedEmployeeObj = {},
            currentDayObj = {...state.currentDayObj};
        if (isClockOut) {
            selectedEmployeeObj = {...state.currentDayObj[employee], out: currentTime};
            currentDayObj[employee] =  selectedEmployeeObj;
        } else {
            selectedEmployeeObj = {in: currentTime};
            currentDayObj[employee] = selectedEmployeeObj;
        }
        setState({...state, currentDayObj, renderClockOut: !isClockOut});
    }
    return (
        <div>
            <h1>{dayjs().format("YYYY/MM/DD")}</h1>
            <TableContainer component={Paper}>
                <Table aria-label="employee table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Employee Name</TableCell>
                            <TableCell align="right">IN</TableCell>
                            <TableCell align="right">OUT</TableCell>
                            <TableCell align="center">ACTION</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map( employee => {
                            const employeeStr = employee.replace(/ /g,'');
                            const employeeObj = state.currentDayObj[employeeStr] ? state.currentDayObj[employeeStr] : {};
                            let actionButton;
                            if (!!state.currentDayObj[employeeStr] && state.currentDayObj[employeeStr].in) {
                                actionButton = <Button onClick={() => updateClockTime(true, employeeStr)}>CLOCK OUT</Button>
                            } else {
                                actionButton = <Button onClick={() => updateClockTime(false, employeeStr)}>CLOCK IN</Button>
                            }
                            return (
                                <TableRow key={employeeStr}>
                                    <TableCell align="left"component="th" scope="row">{employee}</TableCell>
                                    <TableCell align="right">{employeeObj.in}</TableCell>
                                    <TableCell align="right">{employeeObj.out}</TableCell>
                                    <TableCell align="center">{actionButton}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TimeSheet;