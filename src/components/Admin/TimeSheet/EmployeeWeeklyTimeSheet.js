import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';
import {authConsts} from '../../../static/constants/auth-constants';

//Style imports
import { StyledTableRow, StyledTableCell } from '../../../static/css/homeStyles';

//Material ui imports
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const EmployeeWeeklyTimeSheet = (props) => {
    const { employee, employeeHours, start, end } = props;
    const [state, setState] = useState({employeeTableRows: []});

    useEffect(() => {
        let employeeTableRows = [];
        for (const key in employeeHours) {
            if (key !== "hasFlaggedDay") {
                employeeTableRows.push(
                    <StyledTableRow key={`${employee}/${key}`}>
                        <StyledTableCell>{dayjs(key, authConsts.DATE).format("YYYY/MM/DD")}</StyledTableCell>
                        <StyledTableCell align="center">{(employeeHours[key].hours/60).toFixed(2)}</StyledTableCell>
                        <StyledTableCell align="center">{employeeHours[key].isFlagged ? "yes" : "no"}</StyledTableCell>
                    </StyledTableRow>
                )
            }
        }
        setState({...state, employeeTableRows});
    }, [])
    return (
        <div>
            <div>
                <h2>{employee}</h2>
                <p>{dayjs(start).format("YYYY/MM/DD")} - {dayjs(end).format("YYYY/MM/DD")}</p>
            </div>
             <div>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>DAY/day-chinese</StyledTableCell>
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

export default withRouter(EmployeeWeeklyTimeSheet);