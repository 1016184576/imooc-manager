import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './router/index';
import { Provider } from 'react-redux';
import createStore from './redux/store';
import 'normalize.css';
import 'antd/dist/antd.css';
import "./less/common.less";

let store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Routers />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
