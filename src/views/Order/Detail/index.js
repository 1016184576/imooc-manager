import React from 'react';
import { Card } from "antd";
import { carModeConfig } from '../../../config/fieldRenderConfig';
import axios from '../../../axios/axios';
import AMap from '../../../common/map';
import "./index.less";

export default class OrderDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      order_detail:{}
    }
  }
  componentWillMount(){
    this.getOrderDetail();
  }

  getOrderDetail = () => {
    const _that = this;
    axios.ajax({
      url:'/order_detail',
      params:{
        orderNo:_that.props.match.params.id
      }
    }).then((res)=>{
      this.setState({
        order_detail: res.data
      })
      this.renderMap(res.data);
    })
  }

  

  //初始化渲染地图
  renderMap = (result) => {
    this.map = new AMap.Map('orderDetailMap', {
      resizeEnable: true,
      expandZoomRange:true,
      zooms:[3,20],
      zoom: 11,
      center:[116.333926,39.997245]
    });
    this.addMapControl();
    this.drawBikeRoute(result.position_list);
    this.dearServiceArea(result.area);
  }

  //添加地图控件
  addMapControl(){
    let map = this.map;
    AMap.plugin(['AMap.ToolBar','AMap.Scale'],() => {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    })
  }

  //绘制线路图
  drawBikeRoute(positionList){
    let map = this.map;
    if(positionList.length){
      let startPoint = '';
      let endPoint = '';
      //起点坐标标记
      startPoint = new AMap.LngLat(positionList[0].lon,positionList[0].lat);
      let startIcon = new AMap.Icon({
        size: new AMap.Size(36, 42),
        // 图标的取图地址
        image: '/assets/start_point.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(36, 42),
      })
      let startMarker = new AMap.Marker({
        position: startPoint,
        icon: startIcon,
        offset: new AMap.Pixel(-15, -40)
      });

      //终点坐标标记
      let lastIndex = positionList.length - 1;
      endPoint = new AMap.LngLat(positionList[lastIndex].lon,positionList[lastIndex].lat);
      let endIcon = new AMap.Icon({
        size: new AMap.Size(36, 42),
        // 图标的取图地址
        image: '/assets/end_point.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(36, 42),
      })
      let endMarker = new AMap.Marker({
        position: endPoint,
        icon: endIcon,
        offset: new AMap.Pixel(-13, -40)
      });
      map.add([startMarker,endMarker]);

      //连接线路图
      let trackPoint = positionList.map((item)=>{
        return new AMap.LngLat(item.lon,item.lat);
      });
      
      let polyline = new AMap.Polyline({
        path: trackPoint,
        isOutline: true,
        outlineColor: '#ffeeff',
        borderWeight: 3,
        strokeColor: "#3366FF", 
        strokeOpacity: 1,
        strokeWeight: 3,
        // 折线样式还支持 'dashed'
        strokeStyle: "solid",
        // strokeStyle是dashed时有效
        strokeDasharray: [10, 5],
        lineJoin: 'round',
        lineCap: 'round',
        zIndex: 50,
      })
      map.add(polyline)
      //缩放地图到合适的视野级别
      map.setFitView([ polyline ])
      map.setCenter(endPoint);
    }
  }
  //绘制服务区
  dearServiceArea(areaList){
    let map = this.map;
    if(areaList){
      let trackPoint = areaList.map((item)=>{
        return new AMap.LngLat(item.lon,item.lat);
      });
      var polygon = new AMap.Polygon({
        path: trackPoint,
        strokeColor: "#CE0000", 
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.4,
        fillColor: '#ff8605',
        zIndex: 50,
      })
      map.add(polygon);
      //缩放地图到合适的视野级别
      map.setFitView([ polygon ])
    }
  }

  render() {
    return (
      <div className="order-detail-warp">
        <Card className="card">
          <div id="orderDetailMap" className="detail-map-warp">
          
          </div>
          <div className="detail-info-warp">
            <div className="detail-info-item">
              <h3 className="item-title">基础信息</h3>
              <ul>
                <li>
                  <div className="item-left">用车模式</div>
                  <div className="item-right">{carModeConfig[this.state.order_detail.carMode]}</div>
                </li>
                <li>
                  <div className="item-left">订单编号</div>
                  <div className="item-right">{`T${this.state.order_detail.orderNo}`}</div>
                </li>
                <li>
                  <div className="item-left">车辆编号</div>
                  <div className="item-right">{this.state.order_detail.carNo}</div>
                </li>
                <li>
                  <div className="item-left">用户姓名</div>
                  <div className="item-right">{this.state.order_detail.userName}</div>
                </li>
                <li>
                  <div className="item-left">手机号码</div>
                  <div className="item-right">{this.state.order_detail.phone}</div>
                </li>
              </ul>
            </div>
            <div className="detail-info-item">
              <h3 className="item-title">行驶轨迹</h3>
              <ul>
                <li>
                  <div className="item-left">行程起点</div>
                  <div className="item-right">{this.state.order_detail.start_location}</div>
                </li>
                <li>
                  <div className="item-left">行程终点</div>
                  <div className="item-right">{this.state.order_detail.end_location}</div>
                </li>
                <li>
                  <div className="item-left">行驶里程</div>
                  <div className="item-right">10公里</div>
                </li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}