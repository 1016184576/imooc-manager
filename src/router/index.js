
import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App';
import Login from '../views/Login';
import NotFound from '../views/NotFound';
import Home from '../views/Home';
import Admin from '../Admin';
import Buttons from '../views/UI/Buttons';
import Modals from '../views/UI/Modals';
import Loadings from '../views/UI/Loadings';
import Notifications from '../views/UI/Notifications';
import Messages from '../views/UI/Messages';
import Tabs from '../views/UI/Tabs';

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" render={()=>
              <Admin>
                <Switch>
                  <Route path="/admin/home" component={Home} />
                  <Route path="/admin/ui/buttons" component={Buttons} />
                  <Route path="/admin/ui/modals" component={Modals} />
                  <Route path="/admin/ui/loadings" component={Loadings} />
                  <Route path="/admin/ui/notification" component={Notifications} />
                  <Route path="/admin/ui/messages" component={Messages} />
                  <Route path="/admin/ui/Tabs" component={Tabs} />
                  <Route component={NotFound} />
                </Switch>
              </Admin>
            } />
            <Route path="/order/detail"  component={Login} />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    )
  }
}