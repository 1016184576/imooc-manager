import React from 'react';
import { Card } from "antd";
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import ReactEcharts from 'echarts-for-react';
import echartTheme from '../echartTheme';
import "./index.less";

export default class Line extends React.Component {
  componentWillMount() {
    echarts.registerTheme('imooc_theme', echartTheme);
  }

  getOption1 = () => {
    let option = {
      title:{
        text:'用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [
        {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [800, 2000, 1200, 4000, 2500, 2100, 4000]
        }
      ]
    }
    return option;
  }

  getOption2 = () => {
    let option = {
      title:{
        text:'用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
      },
      color:['#ff5400','#f9c700'],
      legend:{
        data: ['摩拜','OFO']
      },
      xAxis: [
        {
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [{
          name: '摩拜',
          type: 'line',
          data: [2000, 3000, 4000, 5000, 8000, 9000, 12000]
        },{
          name: 'OFO',
          type: 'line',
          data: [3000, 4000, 600, 8000, 11000, 13000, 15000]
      }]
    }
    return option;
  }

  getOption3 = () => {
    let option = {
      title:{
        text:'用户骑行订单'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '订单量',
          type: 'line',
          data: [800, 3000, 1200, 4000, 2500, 2100, 1200],
          areaStyle: {}
        }
      ]
    }
    return option;
  }

  render() {
    return (
      <div className="line-warp">
        <Card className="card" title="折线图表之一">
          <ReactEcharts
            option={this.getOption1()}
            theme={"imooc_theme"}
            style={{height:500}}
          />
        </Card>
        <Card className="card" title="折线图表之二">
          <ReactEcharts
            option={this.getOption2()}
            theme={"imooc_theme"}
            style={{height:500}}
          />
        </Card>
        <Card title="折线图表之三">
          <ReactEcharts
            option={this.getOption3()}
            theme={"imooc_theme"}
            style={{height:500}}
          />
        </Card>
      </div>
    )
  }
}
