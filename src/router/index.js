
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../app';
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
import Gallerys from '../views/UI/Gallerys';
import Carousels from '../views/UI/Carousels';
import FormLogin from '../views/Form/FormLogin';
import FormRegister from '../views/Form/FormRegister';
import BasicTable from '../views/Table/BasicTable';
import HighTable from '../views/Table/HighTable';

export default class Routers extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/admin" render={({match})=>
              <Admin>
                <Switch>
                  <Route path={`${match.path}/home`} component={Home} />
                  <Route path={`${match.path}/ui/buttons`} component={Buttons} />
                  <Route path={`${match.path}/ui/modals`} component={Modals} />
                  <Route path={`${match.path}/ui/loadings`} component={Loadings} />
                  <Route path={`${match.path}/ui/notification`} component={Notifications} />
                  <Route path={`${match.path}/ui/messages`} component={Messages} />
                  <Route path={`${match.path}/ui/tabs`} component={Tabs} />
                  <Route path={`${match.path}/ui/gallerys`} component={Gallerys} />
                  <Route path={`${match.path}/ui/carousels`} component={Carousels} />
                  <Route path={`${match.path}/form/login`} component={FormLogin} />
                  <Route path={`${match.path}/form/register`} component={FormRegister} />
                  <Route path={`${match.path}/table/basic`} component={BasicTable} />
                  <Route path={`${match.path}/table/high`} component={HighTable} />
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