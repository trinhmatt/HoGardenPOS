import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from "../components/Home"

const AppRouter = () => (
    <Router>
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        </Route>
        {/* <Route path="/:region/:orderNum">
          <OrderInfo />
        </Route>
        <Route exact path="/exp-driver">
          <ExpressHome />
        </Route>
        <Route exact path="/login">
          <DriverLogin />
        </Route>
        
        
        <Route exact path="/driver">
          <DriverHome />
        </Route>
        
        <Route exact path="/thanks">
          <Thanks />
        </Route>
        
        <Route path="/:orderNum">
          <ExpressOrderInfo />
        </Route> */}
        
        
      </Switch>
    </Router>
  )
  
  export default AppRouter;