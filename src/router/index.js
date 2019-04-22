
import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
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
                  <Route path="/admin/ui/tabs" component={Tabs} />
                  <Route path="/admin/ui/gallerys" component={Gallerys} />
                  <Route path="/admin/ui/carousels" component={Carousels} />
                  <Route path="/admin/form/login" component={FormLogin} />
                  <Route path="/admin/form/register" component={FormRegister} />
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