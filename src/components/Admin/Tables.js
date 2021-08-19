import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import dayjs from 'dayjs';
import cx from 'clsx';

import { authConsts } from '../../static/constants/auth-constants';
import database from '../../firebase/firebase';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

//Material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Tables = (props) => {
    const styles = homeStyles();
    const [state, setState] = useState({
                                filledTables: {}
                            });

    const startAdminOrder = (e) => {
        let tableNumber = e.currentTarget.id;
        if (tableNumber.indexOf("C") > -1) {
            tableNumber = tableNumber.replace("C", "門");
        }
        if (state.filledTables[tableNumber]) {
            props.history.push(`/order/${tableNumber}/review`);
        } else {
            props.history.push(`/admin/place-order/${e.currentTarget.id}`);
        }
    }

    useEffect(() => {
        database.ref(`orders/${dayjs().format(authConsts.DATE)}`).on("value", (snapshot) => {
            const orders = snapshot.val();
            let filledTables = {};

            if (orders && orders.length > 0) {
                for (let i = 0; i < orders.length; i++) {
                    filledTables[orders[i].table] = true;
                }
            }
            setState({...state, filledTables});
        })
    }, [])

    return (
        <div className={styles.homebg}>
            <div className={styles.tableLayout}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C7" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門7"] && styles.orderTakenTable))}>門7</Paper>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Paper id="C6" onClick={startAdminOrder} className={cx(styles.smolhTable,(state.filledTables["門6"] && styles.orderTakenTable))}>門6</Paper>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Paper id="C5" onClick={startAdminOrder} className={cx(styles.smolhTable,(state.filledTables["門5"] && styles.orderTakenTable))}>門5</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C4" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門4"] && styles.orderTakenTable))}>門4</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="CB" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門B"] && styles.orderTakenTable))}>門B</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C3" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門3"] && styles.orderTakenTable))}>門3</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C2" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門2"] && styles.orderTakenTable))}>門2</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C1" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門1"] && styles.orderTakenTable))}>門1</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="CA" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["門A"] && styles.orderTakenTable))}>門A</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="A" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["A"] && styles.orderTakenTable))}>A</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="B" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["B"] && styles.orderTakenTable))}>B</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="41" onClick={startAdminOrder} className={cx(styles.vTable,(state.filledTables["41"] && styles.orderTakenTable))}>41</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="21" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["21"] && styles.orderTakenTable))}>21</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="1" onClick={startAdminOrder} className={cx(styles.roundTable,(state.filledTables["1"] && styles.orderTakenTable))}>1</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="42" onClick={startAdminOrder} className={cx(styles.vTable,(state.filledTables["42"] && styles.orderTakenTable))}>42</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="22" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["22"] && styles.orderTakenTable))}>22</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="2" onClick={startAdminOrder} className={cx(styles.roundTable,(state.filledTables["2"] && styles.orderTakenTable))}>2</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="43" onClick={startAdminOrder} className={cx(styles.vTable,(state.filledTables["43"] && styles.orderTakenTable))}>43</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="23" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["23"] && styles.orderTakenTable))}>23</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="3" onClick={startAdminOrder} className={cx(styles.roundTable,(state.filledTables["3"] && styles.orderTakenTable))}>3</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="44" onClick={startAdminOrder} className={cx(styles.vTable,(state.filledTables["44"] && styles.orderTakenTable))}>44</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="24" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["24"] && styles.orderTakenTable))}>24</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="4" onClick={startAdminOrder} className={cx(styles.roundTable,(state.filledTables["4"] && styles.orderTakenTable))}>4</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="45" onClick={startAdminOrder} className={cx(styles.hTable,(state.filledTables["45"] && styles.orderTakenTable))}>45</Paper>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default withRouter(Tables);