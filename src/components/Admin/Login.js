import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { firebase } from '../../firebase/firebase';
import { connect } from 'react-redux';

// style imports
import '../../static/css/home.css';

// material ui imports
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import { homeStyles } from '../../static/css/homeStyles';

// icon imports
import { AlternateEmail, Lock } from '@material-ui/icons';

const Login = (props) => {
    // style consts
    const styles = homeStyles();

    const { history } = props;
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        if (props.auth.userData) {
            history.push('/admin/orders');
        }
    }, [props.auth])
    const handleInputChange = (e) => {
        setState({ ...state, [e.currentTarget.id]: e.currentTarget.value })
    }

    const handleLogin = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                firebase.auth().signInWithEmailAndPassword(state.email, state.password)
                    .then((userData) => {
                        console.log('logged in');
                    })
                    .catch((err) => {
                        if (err.code.indexOf("user-not-found") > -1) {
                            setState({ ...state, errMsg: "User does not exist" });
                        } else if (err.code.indexOf("wrong-password") > -1) {
                            setState({ ...state, errMsg: "Invalid password" });
                        } else {
                            setState({ ...state, errMsg: err.code });
                        }
                    });
            })
            .catch(err => console.log(err));
    }
    return (
        <div className={styles.loginbg}>
            <div className={styles.centered}>
                <Paper elevation={2} className={styles.loginCard}>
                    <div className={styles.header}>
                        <h1 className={styles.homeTitle}>login</h1>
                        <h2 className={styles.homeTitle2}>登录</h2>
                    </div>
                    <br />
                    <TextField
                        onChange={handleInputChange}
                        value={state.email}
                        id="email"
                        variant="outlined"
                        label="Email/电子邮件"
                        color="secondary"
                        className={styles.inputField}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><AlternateEmail /></InputAdornment>)
                        }}
                    />
                    <br />
                    <TextField
                        onChange={handleInputChange}
                        value={state.password}
                        id="password"
                        variant="outlined"
                        label="Password/密码"
                        type="password"
                        color="secondary"
                        className={styles.inputField}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>)
                        }} />
                    <br />
                    <Button
                        onClick={handleLogin}
                        variant="contained"
                        color="primary"
                    >
                        Login
                    </Button>
                </Paper>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})


export default connect(mapStateToProps)(withRouter((Login)));