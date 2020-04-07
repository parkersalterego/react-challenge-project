import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Main, Login, OrderForm, ViewOrders } from '../components';
import ProtectedRoute from "./protectedRoute";

class AppRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <ProtectedRoute path="/order" exact component={OrderForm} />
          <ProtectedRoute path="/view-orders" exact component={ViewOrders} />
        </Switch>
      </Router>
    );
  }

}

export default AppRouter;
