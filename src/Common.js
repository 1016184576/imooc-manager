
import React, { Component } from "react";
import Header from "./components/Header";
import { Row } from 'antd';

export default class Common extends Component {
  render() {
    return (
      <div>
        <Row className="container">
          <Header menuType="second"/>
        </Row>
        <Row className="content">
          {this.props.children}
        </Row>
      </div>
    )
  }
}