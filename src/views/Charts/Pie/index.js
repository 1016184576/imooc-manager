import React from 'react';
import { Card } from "antd";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import ReactEcharts from 'echarts-for-react';
import echartTheme from './../echartTheme';
import "./index.less";

export default class Pie extends React.Component {
  componentWillMount() {
    echarts.registerTheme('imooc_theme', echartTheme);
  }

  seriesData = [{
    name: '周一',
    value: 1000
  }, {
    name: '周二',
    value: 1200
  }, {
    name: '周三',
    value: 1300
  }, {
    name: '周四',
    value: 2000
  }, {
    name: '周五',
    value: 3000
  }, {
    name: '周六',
    value: 1100
  }, {
    name: '周日',
    value: 1000
  }];
  color = ['#c1232b', '#27727b', '#fcce10', '#e87c25', '#b5c334', '#fe8463', '#9bca63', '#bda29a', '#6e7074', '#546570', '#c4ccd3']
  getOption1 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        textStyle: {
          color: '#27727b',
          fontWeight: 400,
          fontFamily: 'Microsoft YaHei'
        },
        x: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: this.color,
      legend: {
        data: this.seriesData.map(item => item.name),
        orient: 'vertical',
        right: 10,
        top: 20,
      },
      series: [
        {
          name: '订单量',
          type: 'pie',
          data: this.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center',
        //padding:[0,0,50,0],
        textStyle: {
          color: '#27727b',
          fontWeight: 400,
          fontFamily: 'Microsoft YaHei'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: this.color,
      legend: {
        data: this.seriesData.map(item => item.name),
        orient: 'vertical',
        right: 10,
        top: 20,
      },
      series: [{
        name: '订单',
        type: 'pie',
        avoidLabelOverlap: false,
        radius: ['50%', '80%'],
        data: this.seriesData,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      title: {
        text: '用户骑行订单',
        x: 'center',
        textStyle: {
          color: '#27727b',
          fontWeight: 400,
          fontFamily: 'Microsoft YaHei'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      color: this.color,
      legend: {
        data: this.seriesData.map(item => item.name),
        orient: 'vertical',
        right: 10,
        top: 20,
      },
      series: [{
        name: '订单',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: this.seriesData.sort((a, b) => a.value - b.value),
        roseType: 'radius',
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }]
    }
    return option;
  }

  render() {
    return (
      <div className="bar-warp">
        <Card className="card" title="饼图表之一">
          <ReactEcharts
            option={this.getOption1()}
            theme={"imooc_theme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card className="card" title="饼图表之二">
          <ReactEcharts
            option={this.getOption2()}
            theme={"imooc_theme"}
            style={{ height: 500 }}
          />
        </Card>
        <Card title="饼图表之三">
          <ReactEcharts
            option={this.getOption3()}
            theme={"imooc_theme"}
            style={{ height: 500 }}
          />
        </Card>
      </div>
    )
  }
}
