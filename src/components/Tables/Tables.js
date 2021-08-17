import React, { useState, useEffect } from 'react';

//Style imports
import { homeStyles } from '../../static/css/homeStyles';

//Material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Tables = (props) => {
    const styles = homeStyles();

    return (
        <div className={styles.homebg}>
            <div className={styles.tableLayout}>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門7</Paper>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Paper className={styles.smolhTable}>門6</Paper>
                </Grid>
                <Grid item xs={12} sm={1}>
                    <Paper className={styles.smolhTable}>門5</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門4</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門B</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={1}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門3</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門2</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門3</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>門A</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>A</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>B</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>41</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>21</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>1</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>42</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>22</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>2</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>43</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>23</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>3</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>44</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>24</Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>4</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>45</Paper>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

export default Tables;