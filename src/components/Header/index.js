import React, { Component } from "react";
import { Row, Col } from "antd";
import Utils from '../../utils/utils';
import Axios from '../../axios/axios';
import "./index.less";

export default class Header extends Component {
  state = {
    username:'正完美先森',
    sysTime:'',
    dayPictureUrl:'',
    weather:'',
  }
  componentWillMount(){
    this.getWeatherApiData();
    setInterval(()=>{
      let nowTime = new Date().getTime();
      let sysTime = Utils.formatDate(nowTime);
      this.setState({
        sysTime
      })
    },1000)
  }

  //获取百度API天气数据
  getWeatherApiData(){
    let city = '上海';
    Axios.jsonp({
      url:`http://api.map.baidu.com/telematics/v3/weather?location=${decodeURIComponent(city)}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    }).then((res) => {
      let { dayPictureUrl, weather } = res[0].weather_data[0];
      this.setState({
        dayPictureUrl,
        weather
      })
    }).catch((err)=>{
      console.log(err)
    })
  }

  render() {
    return (
      <div className="header">
        <Row className="header-top">
          <Col span={24}>
            <span>欢迎，{this.state.username}</span>
            <a href="#">退出</a>
          </Col>
        </Row>
        <Row className="breadcrumb">
          <Col span={4} className="breadcrumb-title">
            <span>首页</span>
          </Col>
          <Col className="weather">
            <span className="date">{this.state.sysTime}</span>
            <span className="weather-symbol">
              <img src={this.state.dayPictureUrl} alt=""/>
            </span>
            <span className="weather-detail">{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}

