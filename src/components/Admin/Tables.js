import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

//Material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Tables = (props) => {
    const styles = homeStyles();

    const startAdminOrder = (e) => {
        props.history.push(`/admin/place-order/${e.currentTarget.id}`);
    }

    return (
        <div className={styles.homebg}>
            <div className={styles.tableLayout}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C7" onClick={startAdminOrder} className={styles.hTable}>門7</Paper>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Paper id="C6" onClick={startAdminOrder} className={styles.smolhTable}>門6</Paper>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Paper id="C5" onClick={startAdminOrder} className={styles.smolhTable}>門5</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C4" onClick={startAdminOrder} className={styles.hTable}>門4</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="CB" onClick={startAdminOrder} className={styles.hTable}>門B</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C3" onClick={startAdminOrder} className={styles.hTable}>門3</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C2" onClick={startAdminOrder} className={styles.hTable}>門2</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="C1" onClick={startAdminOrder} className={styles.hTable}>門1</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="CA" onClick={startAdminOrder} className={styles.hTable}>門A</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="A" onClick={startAdminOrder} className={styles.hTable}>A</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="B" onClick={startAdminOrder} className={styles.hTable}>B</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="41" onClick={startAdminOrder} className={styles.vTable}>41</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="21" onClick={startAdminOrder} className={styles.hTable}>21</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="1" onClick={startAdminOrder} className={styles.roundTable}>1</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="42" onClick={startAdminOrder} className={styles.vTable}>42</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="22" onClick={startAdminOrder} className={styles.hTable}>22</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="2" onClick={startAdminOrder} className={styles.roundTable}>2</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="43" onClick={startAdminOrder} className={styles.vTable}>43</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="23" onClick={startAdminOrder} className={styles.hTable}>23</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="3" onClick={startAdminOrder} className={styles.roundTable}>3</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="44" onClick={startAdminOrder} className={styles.vTable}>44</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="24" onClick={startAdminOrder} className={styles.hTable}>24</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper id="4" onClick={startAdminOrder} className={styles.roundTable}>4</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper id="45" onClick={startAdminOrder} className={styles.hTable}>45</Paper>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default withRouter(Tables);