
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import storage from '../common/storage';

//私有路由，只有登录的用户才能访问
class PrivateRoute extends React.Component {
  componentWillMount() {
    let isAuthenticated = storage.get("user") ? true : false;
    this.setState({ isAuthenticated })
    if (!isAuthenticated) {
      const { history } = this.props;
      setTimeout(() => {
        history.replace({
          pathname: "/login",
          state: { from: this.props.location }
        });
      }, 500)
    }
  }
  render() {
    let { component: Component, ...rest } = this.props;
    return this.state.isAuthenticated ? (
      <Route {...rest} render={(props) => (<Component {...props} />)} />
    ) : <h1 style={{ textAlign: "center" }}>请重新登录</h1>;
  }
}
PrivateRoute.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  strict: PropTypes.bool,
  component: PropTypes.func.isRequired
}
export default withRouter(PrivateRoute);