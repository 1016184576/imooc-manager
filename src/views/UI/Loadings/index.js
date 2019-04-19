import React from 'react';
import { Card, Icon, Spin, Alert} from "antd"
import "./index.less";

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

export default class Loadings extends React.Component{
  render(){
    return(
      <div className="loading-warp">
          <Card className="card" title="Spin用法">
            <Spin size="small" />
            <Spin />
            <Spin size="large" />
            <Spin indicator={antIcon} />
          </Card>
          <Card className="card" title="内容遮罩">
            <Spin spinning={false}>
              <Alert
                message="React"
                description="欢迎来到React高级实战课程！"
                type="info"
              />
            </Spin>
            <Spin spinning={true}>
              <Alert
                message="React"
                description="欢迎来到React高级实战课程！"
                type="info"
              />
            </Spin>
            <Spin spinning={true} tip="加载中...">
              <Alert
                message="React"
                description="欢迎来到React高级实战课程！"
                type="info"
              />
            </Spin>
            <Spin spinning={true} indicator={antIcon}>
              <Alert
                message="React"
                description="欢迎来到React高级实战课程！"
                type="info"
              />
            </Spin>
          </Card>
      </div>
    )
  }
}