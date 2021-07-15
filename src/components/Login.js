import React, { useState } from 'react';
import { withRouter } from "react-router";
import { firebase } from '../firebase/firebase';
import { connect } from 'react-redux';
import { loginSuccess, loginFail } from '../redux/actions/auth-actions';

const Login = (props) => {
    const { loginSuccess, history } = props;
    const [state, setState] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (e) => {
        setState({...state, [e.currentTarget.id]: e.currentTarget.value})
    }

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(state.email, state.password)
            .then((userData) => {
                loginSuccess(userData.user.email);
                history.push("admin/timesheet");
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
        <div>
            <input onChange={handleInputChange} value={state.email} id="email" type="text"/>
            <input onChange={handleInputChange} value={state.password} id="password" type="password"/>
            <button onClick={handleLogin}>Login</button>
            {state.errMsg && state.errMsg}
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    loginSuccess: (userData) => dispatch(loginSuccess(userData))
})

export default connect(undefined, mapDispatchToProps)(withRouter((Login)));