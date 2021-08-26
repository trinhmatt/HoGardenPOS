import React from "react";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { connect } from 'react-redux';

import Home from "../components/Home";
import Login from "../components/Admin/Login"
import TimeSheet from "../components/Admin/TimeSheet/TimeSheet";
import Menu from "../components/Menu/Menu";
import NotFound from "../components/NotFound";
import AddItem from "../components/AddItem/AddItem";
import Unauthorized from "../components/Unauthorized";
import Orders from "../components/Admin/Orders/Orders";
import ReviewOrder from "../components/ReviewOrder/ReviewOrder";
import BottomNav from "../components/subcomponents/BottomNav";
import Tables from "../components/Admin/Tables";
import AdminPlaceOrder from "../components/Admin/AdminPlaceOrder";
import WeeklyTimeSheet from "../components/Admin/TimeSheet/WeeklyTimeSheet";
import EmployeeWeeklyTimeSheet from "../components/Admin/TimeSheet/EmployeeWeeklyTimeSheet";
import Takeout from "../components/Admin/Takeout";
import Settings from "../components/Admin/Settings";

const AppRouter = (props) => {
  return (
    <Router>
      {
        props.auth.userData && 
          <div>
            <BottomNav />
          </div>
      }
      <Switch>

        <PublicRoute path="/" exact={true}>
          <Home />
        </PublicRoute>

        <PublicRoute path="/admin" exact={true}>
          <Login />
        </PublicRoute> 

        <PrivateRoute path="/admin/timesheet" exact={true}>
          <TimeSheet />
        </PrivateRoute>

        <PrivateRoute path="/admin/timesheet/weekly" exact={true}>
          <WeeklyTimeSheet />
        </PrivateRoute>

        <PrivateRoute path="/admin/timesheet/weekly/:employee/:start/:end">
          <EmployeeWeeklyTimeSheet />
        </PrivateRoute>

        <PrivateRoute path="/admin/orders">
          <Orders />
        </PrivateRoute>

        <PrivateRoute path="/admin/tables">
          <Tables />
        </PrivateRoute>

        <PrivateRoute path="/admin/takeout">
          <Takeout />
        </PrivateRoute>

        <PrivateRoute path="/admin/settings">
          <Settings />
        </PrivateRoute>

        <PrivateRoute path="/admin/place-order/:number">
          <AdminPlaceOrder />
        </PrivateRoute>

        <PublicRoute path="/order/:number" exact={true}>
          <Menu />
        </PublicRoute>

        <PublicRoute path="/order/:number/review">
          <ReviewOrder />
        </PublicRoute>

        <PublicRoute path="/order/:number/takeout">
          <ReviewOrder />
        </PublicRoute>

        <PublicRoute path="/add-item">
          <AddItem />
        </PublicRoute>

        <PublicRoute path="/unauthorized">
          <Unauthorized />
        </PublicRoute>

        <PublicRoute path="/*">
          <NotFound />
        </PublicRoute>             
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(AppRouter);