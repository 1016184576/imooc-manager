
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import App from '../App';
import Common from '../Common';
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
import City from '../views/City';
import Order from '../views/Order';
import OrderDetail from '../views/Order/Detail';
import User from '../views/User';
import BikeMap from '../views/BikeMap';
import Bar from "../views/Charts/Bar";
import Pie from "../views/Charts/Pie";
import Line from "../views/Charts/Line";
import Rich from "../views/Rich";
import Permission from "../views/Permission";


export default class Routers extends Component {
  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/login" component={Login} />
            <AuthRoute path="/common"  render={({match})=>
              <Common>
                <Switch>
                  <Route path={`${match.path}/order/detail/:id`} component={OrderDetail} />
                  <Route component={NotFound} />
                </Switch>
              </Common>
            } />
            <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <AuthRoute path='/home' component={Home} />
                  <AuthRoute path='/ui/buttons' component={Buttons} />
                  <AuthRoute path='/ui/modals' component={Modals} />
                  <AuthRoute path='/ui/loadings' component={Loadings} />
                  <AuthRoute path='/ui/notification' component={Notifications} />
                  <AuthRoute path='/ui/messages' component={Messages} />
                  <AuthRoute path='/ui/tabs' component={Tabs} />
                  <AuthRoute path='/ui/gallerys' component={Gallerys} />
                  <AuthRoute path='/ui/carousels' component={Carousels} />
                  <AuthRoute path='/form/login' component={FormLogin} />
                  <AuthRoute path='/form/register' component={FormRegister} />
                  <AuthRoute path='/table/basic' component={BasicTable} />
                  <AuthRoute path='/table/high' component={HighTable} />
                  <AuthRoute path='/city' component={City} />
                  <AuthRoute path='/order' component={Order}/>
                  <AuthRoute path='/user' component={User}/>
                  <AuthRoute path='/bikeMap' component={BikeMap}/>
                  <AuthRoute path='/charts/bar' component={Bar}/>
                  <AuthRoute path='/charts/pie' component={Pie}/>
                  <AuthRoute path='/charts/line' component={Line}/>
                  <AuthRoute path='/rich' component={Rich}/>
                  <AuthRoute path='/permission' component={Permission}/>
                  <Redirect to="/home" />
                  <Route component={NotFound} />
                </Switch>
              </Admin>
            } />
            <Route component={NotFound} />
          </Switch>
        </App>
      </Router>
    )
  }
}

let isAuthenticated = localStorage.getItem('user');

function AuthRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}