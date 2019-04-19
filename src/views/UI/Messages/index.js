import React from 'react';
import { Card, Button, Message } from "antd"
import "./index.less";

export default class Messages extends React.Component {

  openMessgae = (type) => {
    Message[type]('恭喜你，React课程晋级成功.');
  };
  render() {
    return (
      <div className="message-warp">
        <Card title="全局提示框" className="card">
          <Button type="primary" onClick={() => this.openMessgae('success')}>Success</Button>
          <Button type="primary" onClick={() => this.openMessgae('info')}>Info</Button>
          <Button type="primary" onClick={() => this.openMessgae('warning')}>Warning</Button>
          <Button type="primary" onClick={() => this.openMessgae('error')}>Error</Button>
          <Button type="primary" onClick={() => this.openMessgae('loading')}>Loading</Button>
        </Card>
      </div>
    )
  }
}