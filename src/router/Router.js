import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "../components/Home"
import Login from "../components/Login"
import TimeSheet from "../components/TimeSheet";
import Menu from "../components/Menu";
import NotFound from "../components/NotFound";
import AddItem from "../components/AddItem";
import AdminHome from "../components/AdminHome";

const AppRouter = () => (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        <Route path="/admin" exact={true}>
          <Login />
        </Route>  
        <Route path="/admin/home">
          <AdminHome />
        </Route>
        <Route path="/admin/timesheet">
          <TimeSheet />
        </Route>
        <Route path="/order/:number">
          <Menu />
        </Route>
        <Route path="/add-item">
          <AddItem />
        </Route>
        <Route path="/*">
          <NotFound />
        </Route>             
      </Switch>
    </Router>
  )
  
  export default AppRouter;