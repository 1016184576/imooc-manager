import React, { Component } from "react";
import { Row, Col, Modal } from "antd";
import Utils from '../../utils/utils';
import Axios from '../../axios/axios';
import storage from '../../common/storage';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import "./index.less";

class Header extends Component {

  constructor(props) {
    super(props)
    this.state = {
      sysTime: '',
      dayPictureUrl: '',
      weather: '',
      timer: null
    };
  }
  componentWillMount() {
    this.getWeatherApiData();
    let user = storage.get('user');
    let interval = setInterval(() => {
      let nowTime = new Date().getTime();
      let sysTime = Utils.formatDate(nowTime);
      this.setState({
        sysTime
      })
    }, 1000)
    this.setState({
      timer: interval,
      username: user ? JSON.parse(user).username : '正完美先森'
    })
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
  //获取百度API天气数据
  getWeatherApiData() {
    let city = '上海';
    Axios.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${decodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then((res) => {
      let { dayPictureUrl, weather } = res[0].weather_data[0];
      this.setState({
        dayPictureUrl,
        weather
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  quit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    Modal.confirm({
      title: '确认退出',
      content: '确认要退出系统吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        storage.remove('user');
        this.props.history.push({
          pathname: '/login'
        })
      }
    })
  }

  render() {
    const { menuType } = this.props;
    return (
      <div className={menuType ? "header simple-page" : "header"}>
        <Row className="header-top">
          {
            menuType ? <Col span={6} className="simple-logo">
              <img src="/assets/logo-ant.svg" alt="" />
              <span>IMOOC通用管理系统</span>
            </Col> : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎，{this.state.username}</span>
            <a href="/" onClick={this.quit}>退出</a>
          </Col>
        </Row>
        {
          menuType ? '' : <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              <span>{this.props.menuName}</span>
            </Col>
            <Col className="weather">
              <span className="date">{this.state.sysTime}</span>
              <span className="weather-symbol">
                <img src={this.state.dayPictureUrl} alt="" />
              </span>
              <span className="weather-detail">{this.state.weather}</span>
            </Col>
          </Row>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  menuName: state.switchMenuName
})

export default connect(mapStateToProps)(withRouter(Header))