import React from 'react';
import { Card } from "antd";
import { cityConfig, orderStatusConfig } from '../../config/fieldRenderConfig';
import AMap from '../../common/map';
import { getBikeList } from '../../api/bikemap'
import FilterForm from '../../components/FilterForm';
import "./index.less";

export default class BikeMap extends React.Component {
  formList = [{
    type: 'SELECT',
    label: '城市',
    width: 100,
    placeholder: '请选择',
    field: 'city',
    initialValue: '0',
    list: Object.keys(cityConfig).map((key) => {
      return {
        id: key,
        text: cityConfig[key]
      }
    })
  }, {
    type: 'TIME',
    width: 200,
    placeholder: '请选择时间'
  }, {
    type: 'SELECT',
    label: '订单状态',
    width: 150,
    placeholder: '请选择',
    field: 'order_status',
    initialValue: '0',
    list: Object.keys(orderStatusConfig).map((key) => {
      return {
        id: key,
        text: orderStatusConfig[key]
      }
    })
  }]

  componentWillMount(){
    this.loadBikeMapData();
  }

  handleQuerySubmit = () =>{
    this.loadBikeMapData();
  }

  //加载地图数据
  loadBikeMapData = () => {
    getBikeList({
      pageIndex: 0,
      pageSize: 10
    }).then(res=>{
      this.renderMap(res.data);
    })
    
  }

  //初始化渲染地图
  renderMap = (result) => {
    this.map = new AMap.Map('bikeMap', {
      resizeEnable: true,
      expandZoomRange:true,
      zooms:[4,18],
      zoom: 11,
      center:[116.333926,39.997245]
    });
    this.addMapControl();
    this.drawBikePoint(result.bike_list);
    this.drawBikeRoute(result.route_list);
    this.dearServiceArea(result.service_list);
  }

   //添加地图控件
   addMapControl(){
    let map = this.map;
    AMap.plugin(['AMap.ToolBar','AMap.Scale'],() => {
      map.addControl(new AMap.ToolBar());
      map.addControl(new AMap.Scale());
    })
  }
  /*绘制线路图*/
  drawBikeRoute(route_list){
    let map = this.map;
    if(route_list.length){
      let startPoint = '';
      let endPoint = '';
      //起点坐标标记
      startPoint = route_list[0].split(',');
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
        offset: new AMap.Pixel(-18, -42),
      });

      //终点坐标标记
      let lastIndex = route_list.length - 1;
      endPoint = route_list[lastIndex].split(',')  //new AMap.LngLat(route_list[lastIndex]);
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
        offset: new AMap.Pixel(-18, -42)
      });
      map.add([startMarker,endMarker]);

      //连接线路图
      let trackPoint = route_list.map((item)=>{
        let arr = item.split(',');
        return new AMap.LngLat(arr[0],arr[1]);
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
  drawBikePoint(bike_list){
    let map = this.map;
    if(bike_list.length){
      let pointIcon = new AMap.Icon({
        size: new AMap.Size(36, 42),
        // 图标的取图地址
        image: '/assets/bike.jpg',
        // 图标所用图片大小
        imageSize: new AMap.Size(36, 42),
      })
      let bikePointArray = bike_list.map((item)=>{
        let arr = item.split(',');
        return new AMap.Marker({
          position: arr,
          icon: pointIcon,
          offset: new AMap.Pixel(-18, -42)
        });
      });
      map.add(bikePointArray)
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
        fillOpacity: 0,
        fillColor: '#fff',
        zIndex: 50,
      })
      map.add(polygon);
      //缩放地图到合适的视野级别
      map.setFitView([ polygon ])
    }
  }
 

  render() {
    return (
      <div className="bikeMap-warp">
        <Card className="card">
          <FilterForm formList={this.formList} handleSubmit={this.handleQuerySubmit}/>
        </Card>
        <Card>
          <p>共100辆</p>
          <div id="bikeMap" className="bike-map">

          </div>
        </Card>
      </div>
    )
  }
}
