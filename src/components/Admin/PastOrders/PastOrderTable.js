import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

//Style imports
import { homeStyles, StyledTableRow, StyledTableCell } from '../../../static/css/homeStyles';

//Material ui imports
import Paper from '@material-ui/core/Paper';

import { itemChoices } from '../../../static/constants/menu-constants';

const PastOrderTable = (props) => {
    const styles = homeStyles();
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

                orderCells.push(<StyledTableCell key={`title/${i}-${n}`}><b className={styles.pastOrderTableCell}>{n === 0 ? `${data.orders[i].table} ${data.orders[i].takeoutNumber ? data.orders[i].takeoutNumber : ""}` : ""}</b></StyledTableCell>);
                orderCells.push(<StyledTableCell key={`item/${i}-${n}`}><span className={styles.pastOrderItem}>{data.orders[i].orderItems[n].chinese}/{data.orders[i].orderItems[n].english}</span></StyledTableCell>);
                orderCells.push(<StyledTableCell align="center" key={`price/${i}-${n}`}>${data.orders[i].orderItems[n].price.toFixed(2)}</StyledTableCell>);

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
                                <StyledTableCell><span className={styles.pastOrderAddOn}>{`- ${data.orders[i].orderItems[n][itemChoices[key].menuKey].chinese}/${data.orders[i].orderItems[n][itemChoices[key].menuKey].english}`}</span></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        );
                    } else if (key === "choices" && data.orders[i].orderItems[n][key].length > 0) {
                        for (let a = 0; a < data.orders[i].orderItems[n][key].length; a++) {
                            tableRows.push(
                                <TableRow>
                                    <StyledTableCell></StyledTableCell>
                                    <StyledTableCell><span className={styles.pastOrderAddOn}>{`- ${data.orders[i].orderItems[n][key][a].chinese}/${data.orders[i].orderItems[n][key][a].english}`}</span></StyledTableCell>
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
                                <StyledTableCell><span className={styles.pastOrderAddOn}>{`- ${data.orders[i].orderItems[n].selectedProtein.chinese}/${data.orders[i].orderItems[n].selectedProtein.english}`}</span></StyledTableCell>
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
                                <StyledTableCell><span className={styles.pastOrderAddOn}>{`- ${data.orders[i].orderItems[n].addOn[x].chinese}/${data.orders[i].orderItems[n].addOn[x].english}`}</span></StyledTableCell>
                                <StyledTableCell align="center">${data.orders[i].orderItems[n].addOn[x].price.toFixed(2)}</StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        )
                    }
                }
                orderTotal += itemTotal;

                if (itemTotal !== data.orders[i].orderItems[n].price) {
                    tableRows.push(
                        <TableRow key={`itemTotal/${i}/${n}`} style={{backgroundColor: '#ededed'}}>
                            <StyledTableCell>ITEM TOTAL</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                            <StyledTableCell align="center">${itemTotal.toFixed(2)}</StyledTableCell>
                            <StyledTableCell></StyledTableCell>
                        </TableRow>
                    )
                }
                
            }

            tableRows.push(
                <TableRow>
                    <StyledTableCell>HST</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="center">${(orderTotal * 0.13).toFixed(2)}</StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                </TableRow>
            )
            tableRows.push(
                <TableRow className={styles.pastOrderTotal}>
                    <StyledTableCell><b>ORDER TOTAL</b></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell align="center"><b className={styles.pastOrderItem}>${(orderTotal * 1.13).toFixed(2)}</b></StyledTableCell>
                </TableRow>
            )
        }
        setState({tableRows, dailyTotal});
    }
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.pastOrderHeader}>
                <h1>{data.date.replaceAll("_", "/")}</h1>
                <h2>DAILY TOTAL/每日總計: ${(state.dailyTotal * 1.13).toFixed(2)}</h2>
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>TABLE/TAKEOUT#<br />餐桌/外賣#</StyledTableCell>
                            <StyledTableCell align="center">ITEM<br />菜單項</StyledTableCell>
                            <StyledTableCell align="center">SUBTOTAL<br />小計</StyledTableCell>
                            <StyledTableCell align="center">ORDER TOTAL<br />全部的</StyledTableCell>
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