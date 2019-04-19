import React from 'react';
import { Card, Button, Modal } from "antd"
import "./index.less";


export default class Modals extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      showModal1:false,
      showModal2:false,
      showModal3:false,
      showModal4:false,
    }
  }
  handleCancel(type){
    this.setState({
      [type]:false
    })
  }
  handleOpen(type){
    this.setState({
      [type]:true
    })
  }
  confirm = () => {
    Modal.confirm({
      title:'确认',
      content: '你确定你学会React了吗？',
    });
  }
  info  = () => {
    Modal.info({
      title:'确认',
      content: '你确定你学会React了吗？',
    });
  }
  success  = () => {
    Modal.success({
      title:'确认',
      content: '你确定你学会React了吗？',
    });
  }
  error  = () => {
    Modal.error({
      title:'确认',
      content: '你确定你学会React了吗？',
    });
  }
  warning  = () => {
    Modal.warning({
      title:'确认',
      content: '你确定你学会React了吗？',
    });
  }
  render(){
    return(
      <div className="modal-warp">
          <Card className="card" title="基础模态框">
            <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open</Button>
            <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
            <Button type="primary" onClick={() => this.handleOpen('showModal3')}>顶部20px弹框</Button>
            <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
          </Card>
          <Card className="card" title="信息确认框">
            <Button type="primary" onClick={this.confirm}>Confirm</Button>
            <Button type="primary" onClick={this.info}>Info</Button>
            <Button type="primary" onClick={this.success}>Success</Button>
            <Button type="primary" onClick={this.error}>Error</Button>
            <Button type="primary" onClick={this.warning}>Warning</Button>
          </Card>

          <Modal 
            title="React"
            visible={this.state.showModal1}
            onCancel={() => this.handleCancel('showModal1')}
          >
            <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>

          <Modal 
            title="React"
            visible={this.state.showModal2}
            onCancel={() => this.handleCancel('showModal2')}
            cancelText="取消"
            okText="确定"
          >
            <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>
          <Modal 
            title="React"
            visible={this.state.showModal3}
            onCancel={() => this.handleCancel('showModal3')}
            style={{top:'20px'}}
          >
            <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>
          <Modal 
            title="React"
            visible={this.state.showModal4}
            onCancel={() => this.handleCancel('showModal4')}
            centered={true}
          >
            <p>欢迎学习慕课新推出的React高级课程</p>
          </Modal>

      </div>
    )
  }
}