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
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 1</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 2</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 3</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 4</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 5</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>table 7</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 8</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>table 9</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>table 10</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 11</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>table 12</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>table 13</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 14</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>table 15</Paper>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.vTable}>table 16</Paper>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.hTable}>table 17</Paper>
                </Grid>
                <Grid item xs={12} sm={3}>
                    <div></div>
                </Grid>
                <Grid item xs={12} sm={2}>
                    <Paper className={styles.roundTable}>table 18</Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default Tables;