
import React, { Component } from "react";
import { Row, Col } from "antd";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NavLeft from "./components/NavLeft";



export default class Admin extends Component {
  render() {
    return (
      <Row className="container">
        <Col span={4} className="nav-left">
          <NavLeft/>
        </Col>
        <Col span={20} className="main">
          <Header />
          <Row className="content">
            这里是主要内容
          </Row>
          <Footer />
        </Col>
      </Row>
    )
  }
}