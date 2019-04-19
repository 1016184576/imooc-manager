import React from 'react';
import { Card, Button, Notification } from "antd"
import "./index.less";

export default class Notifications extends React.Component {

  openNotificationWithIcon = (type, placement) => {
    Notification[type]({
      message: '发工资了',
      description: '上月考勤22天， 迟到12天，实发工资250，请笑纳',
      placement: placement ? placement : "topRight"
    });
  };
  render() {
    return (
      <div className="button-warp">
        <Card title="通知提醒框" className="card">
          <Button type="primary" onClick={() => this.openNotificationWithIcon('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openNotificationWithIcon('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openNotificationWithIcon('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openNotificationWithIcon('error')}>Error</Button>
        </Card>
        <Card title="通知提醒框-方向控制" className="card">
          <Button type="primary" onClick={() => this.openNotificationWithIcon('success', 'topLeft')}>Success-TopLeft</Button>
          <Button type="primary" onClick={() => this.openNotificationWithIcon('info', 'topRight')}>Info-TopRight</Button>
          <Button type="primary" onClick={() => this.openNotificationWithIcon('warning', 'bottomLeft')}>Warning-BottomLeft</Button>
          <Button type="primary" onClick={() => this.openNotificationWithIcon('error', 'bottomRight')}>Error-BottomRight</Button>
        </Card>
      </div>
    )
  }
}