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
                                dailyTotal: 0,
                                orderTotals: []
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
                let itemTotal = 0.0;

                orderCells.push(<StyledTableCell key={`title/${i}-${n}`}>{n === 0 ? `${data.orders[i].table} ${data.orders[i].takeoutNumber ? data.orders[i].takeoutNumber : ""}` : ""}</StyledTableCell>);
                orderCells.push(<StyledTableCell key={`item/${i}-${n}`}>{data.orders[i].orderItems[n].chinese}/{data.orders[i].orderItems[n].english}</StyledTableCell>);
                orderCells.push(<StyledTableCell align="center" key={`price/${i}-${n}`}>{data.orders[i].orderItems[n].price.toFixed(2)}</StyledTableCell>);

                itemTotal += data.orders[i].orderItems[n].price;
                dailyTotal += data.orders[i].orderItems[n].price;

                orderCells.push(<StyledTableCell></StyledTableCell>);
                tableRows.push(<TableRow key={`orderItem/${i}/${n}`}>{orderCells}</TableRow>);

                //If orderItem has choices 
                for (const key in data.orders[i].orderItems[n]) {
                    if (itemChoices[key] && data.orders[i].orderItems[n][key] && key !== "choices") {
                        tableRows.push(
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>{`- ${data.orders[i].orderItems[n][itemChoices[key].menuKey].chinese}/${data.orders[i].orderItems[n][itemChoices[key].menuKey].english}`}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        );
                    } else if (key === "choices" && data.orders[i].orderItems[n][key].length > 0) {
                        for (let a = 0; a < data.orders[i].orderItems[n][key].length; a++) {
                            tableRows.push(
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell>{`- ${data.orders[i].orderItems[n][key][a].chinese}/${data.orders[i].orderItems[n][key][a].english}`}</StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell></StyledTableCell>
                                </TableRow>
                            )
                        }
                    }
                }
                if (data.orders[i].orderItems[n].proteinChoice) {
                    console.log(data.orders[i].orderItems[n].selectedProtein)
                    tableRows.push(
                        <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>{`- ${data.orders[i].orderItems[n].selectedProtein.chinese}/${data.orders[i].orderItems[n].selectedProtein.english}`}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                        </TableRow>
                    )
                }
                if (data.orders[i].orderItems[n].addOn && data.orders[i].orderItems[n].addOn.length > 0) {
                    for (let x = 0; x < data.orders[i].orderItems[n].addOn.length; x++) {
                        itemTotal += data.orders[i].orderItems[n].addOn[x].price;
                        dailyTotal += data.orders[i].orderItems[n].addOn[x].price;
                        tableRows.push(
                            <TableRow>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell>{`- ${data.orders[i].orderItems[n].addOn[x].chinese}/${data.orders[i].orderItems[n].addOn[x].english}`}</StyledTableCell>
                                <StyledTableCell align="center">{data.orders[i].orderItems[n].addOn[x].price.toFixed(2)}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        )
                    }
                }
                orderTotal += itemTotal;

                if (itemTotal !== data.orders[i].orderItems[n].price) {
                    tableRows.push(
                        <TableRow key={`itemTotal/${i}/${n}`}>
                            <StyledTableCell>ITEM TOTAL</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="center">{itemTotal.toFixed(2)}</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    )
                }
                
            }
            tableRows.push(
                <TableRow>
                    <StyledTableCell>ORDER TOTAL</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="center">{orderTotal.toFixed(2)}</StyledTableCell>
                </TableRow>
            )
        }
        setState({tableRows, dailyTotal});
    }
    return (
        <div>
            <h2>{data.date.replaceAll("_", "/")}</h2>
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