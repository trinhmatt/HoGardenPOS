import React, { useState } from 'react';
import { withRouter } from "react-router";
import { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';
import { loginSuccess, loginFail } from '../redux/actions/auth-actions';

// style imports
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import {
    CardContent,
    CardMedia,
    CardActionArea,
    Box,
    Typography,
    TextField,
    Button,
    FormControl,
    InputAdornment
} from '@material-ui/core';
import { useLightTopShadowStyles } from '@mui-treasury/styles/shadow/lightTop';
import { useCoverCardMediaStyles } from '@mui-treasury/styles/cardMedia/cover';
import { Row, Item } from '@mui-treasury/components/flex';
import { homeStyles } from '../static/css/homeStyles';

// icon imports
import { AlternateEmail, Lock } from '@material-ui/icons';

const Login = (props) => {
    // style consts
    const styles = homeStyles();
    const shadowStyles = useLightTopShadowStyles();
    const mediaStyles = useCoverCardMediaStyles();

    const { loginSuccess, history } = props;
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setState({ ...state, [e.currentTarget.id]: e.currentTarget.value })
    }

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(state.email, state.password)
            .then((userData) => {
                loginSuccess(userData.user.email);
                history.push("admin/home");
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
    }
    return (
        <div className={styles.homebg}>
            <div className={styles.header}>
                <h1 className={styles.homeTitle}>login</h1>
                <h2 className={styles.homeTitle2}>登录</h2>
            </div>
            <Row alignItems={'center'}>
                <Item position={'center'}>
                    <Card className={cx(styles.loginCard, shadowStyles.root)}>
                        <CardActionArea>
                            <CardContent>
                                <Row mt={10} alignItems={'center'}>
                                    <Item position={'center'}>
                                        <TextField
                                            onChange={handleInputChange}
                                            value={state.email}
                                            id="email"
                                            variant="outlined"
                                            label="Email/电子邮件"
                                            className={styles.inputField}
                                            color="secondary"
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"><AlternateEmail /></InputAdornment>)
                                            }}
                                        />
                                    </Item>
                                </Row>
                                <Row mt={4} alignItems={'center'}>
                                    <Item position={'center'}>
                                        <TextField
                                            onChange={handleInputChange}
                                            value={state.password}
                                            id="password"
                                            variant="outlined"
                                            label="Password/密码"
                                            className={styles.inputField}
                                            type="password"
                                            color="secondary"
                                            InputProps={{
                                                startAdornment: (<InputAdornment position="start"><Lock /></InputAdornment>)
                                            }} />
                                    </Item>
                                </Row>
                                <Row mt={4} alignItems={'center'}>
                                    <Item position={'center'}>
                                        <Button 
                                            onClick={handleLogin}
                                            variant="contained"
                                            color="primary"
                                            >
                                                Login
                                        </Button>
                                    </Item>
                                </Row>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Item>
            </Row>
            {state.errMsg && state.errMsg}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: (userData) => dispatch(loginSuccess(userData))
})

export default connect(undefined, mapDispatchToProps)(withRouter((Login)));