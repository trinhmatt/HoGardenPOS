import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  isAuth,
  comp: Component,
  ...rest
  }) => { 
    return isAuth ? (
        <Route {...rest} render={ (props) => (
            <div>
            <Component {...props}/>
            </div>)} />) : 
        <Redirect to='/unauthorized' />
}


const mapStateToProps = (state) => ({
    isAuth: !!state.auth.userData
})

export default connect(mapStateToProps)(PrivateRoute);