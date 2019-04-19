import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './router/index';
import 'normalize.css';
import 'antd/dist/antd.css';
import "./less/common.less";

ReactDOM.render(<Routers />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
