import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Style imports
import { StyledTableRow, StyledTableCell } from '../../../static/css/homeStyles';

import { itemChoices } from '../../../static/constants/menu-constants';

const PastOrderTable = (props) => {
    const { data } = props;
    const [state, setState] = useState({
                                tableRows: [],
                                dailyTotal: 0
                            });
    useEffect(() => {
        renderData();
    }, []);
    const renderData = () => {
        let tableRows = [];
        let dailyTotal = 0.0;
        for (let i = 0; i < data.orders.length; i++) {
            let orderTotal = 0.0;
            for (let n = 0; n < data.orders[i].orderItems.length; n++) {
                let orderCells = [];

                orderCells.push(<StyledTableCell key={`title/${i}-${n}`}>{n === 0 ? `${data.orders[i].table} ${data.orders[i].takeoutNumber ? data.orders[i].takeoutNumber : ""}` : ""}</StyledTableCell>);
                orderCells.push(<StyledTableCell key={`item/${i}-${n}`}>{data.orders[i].orderItems[n].chinese}/{data.orders[i].orderItems[n].english}</StyledTableCell>);
                orderCells.push(<StyledTableCell align="center" key={`price/${i}-${n}`}>{data.orders[i].orderItems[n].price}</StyledTableCell>);

                orderTotal += data.orders[i].orderItems[n].price;
                dailyTotal += data.orders[i].orderItems[n].price;

                orderCells.push(<StyledTableCell align="center" key>{n === data.orders[i].orderItems.length-1 ? orderTotal.toFixed(2) : ""}</StyledTableCell>)
                tableRows.push(<TableRow key={`order/${i}`}>{orderCells}</TableRow>);

                //If orderItem has choices 
                tableRows.push(<TableRow></TableRow>)
                for (const key in data.orders[i].orderItems[n]) {
                    if (itemChoices[key] && data.orders[i].orderItems[n][key]) {
                        tableRows.push(
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>{`- ${data.orders[i].orderItems[n][itemChoices[key].menuKey].chinese}/${data.orders[i].orderItems[n][itemChoices[key].menuKey].english}`}</StyledTableCell>
                            </TableRow>
                        )
                    }
                }
                if (data.orders[i].orderItems[n].proteinChoice) {
                    tableRows.push(
                        <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>{`- ${data.orders[i].orderItems[n].selectedProtein.chinese}/${data.orders[i].orderItems[n].selectedProtein.english}`}</StyledTableCell>
                        </TableRow>
                    )
                }
                if (data.orders[i].orderItems[n].addOn && data.orders[i].orderItems[n].addOn.length > 0) {
                    for (let x = 0; x < data.orders[i].orderItems[n].addOn.length; x++) {
                        tableRows.push(
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>{`- ${data.orders[i].orderItems[n].addOn[x].chinese}/${data.orders[i].orderItems[n].addOn[x].english}`}</StyledTableCell>
                            </TableRow>
                        )
                    }
                }

            }
        }
        setState({tableRows, dailyTotal});
    }
    return (
        <div>
            <h2>{data.date}</h2>
            <p>DAILY TOTAL: {state.dailyTotal.toFixed(2)}</p>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>TABLE/TAKEOUT #</StyledTableCell>
                            <StyledTableCell align="center">ITEM</StyledTableCell>
                            <StyledTableCell align="center">ITEM SUBTOTAL</StyledTableCell>
                            <StyledTableCell align="center">ORDER TOTAL</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.tableRows}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default PastOrderTable