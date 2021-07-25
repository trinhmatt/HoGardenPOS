import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { firebase } from '../firebase/firebase';

export const PrivateRoute = ({
  isAuth,
  component: Component,
  ...rest
  }) => { 
    console.log(isAuth); 
    return isAuth ? (
        <Route {...rest} component={ (props) => (
            <div>
            <Component {...props}/>
            </div>)} />) : 
        <Redirect to='/unauthorized' />
}


const mapStateToProps = (state) => ({
    isAuth: !!state.auth.userData
})

export default connect(mapStateToProps)(PrivateRoute);