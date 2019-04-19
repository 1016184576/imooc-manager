import React from 'react';
import { Card, Button, Icon, Radio } from "antd"
import "./index.less";

const ButtonGroup = Button.Group;
const RadioGroup = Radio.Group;

export default class Buttons extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      loading:true,
      size:'small'
    }
  }
  handleClose = () => {
    this.setState({
      loading: false
    })
  }
  handleChange = (e) => {
    this.setState({
      size: e.target.value,
    });
  }
  render(){
    return(
      <div className="button-warp">
        <Card title="基础按钮" className="card">
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </Card>
        <Card title="图形按钮" className="card">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button type="primary" shape="circle" icon="search"/>
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>
        <Card title="Loading按钮" className="card">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          <Button type="primary" shape="circle" icon="search" loading={this.state.loading}/>
          <Button loading={this.state.loading}>点击加载</Button>
          <Button shape="circle" icon="search" loading={this.state.loading}/>
          <Button type="primary" onClick={this.handleClose}>关闭</Button>
        </Card>
        <Card title="按钮组" className="card">
          <ButtonGroup className="button-group">
            <Button>取消</Button>
            <Button>确定</Button>
          </ButtonGroup>
          <ButtonGroup className="button-group">
            <Button type="primary">
              <Icon type="left" />返回
            </Button>
            <Button type="primary">
              前进<Icon type="right" />
            </Button>
          </ButtonGroup>
          <ButtonGroup className="button-group">
            <Button type="primary" icon="cloud">云上传</Button>
            <Button type="primary" icon="cloud-download">云下载</Button>
          </ButtonGroup>
        </Card>
        <Card title="尺寸按钮" className="card">
          <RadioGroup  onChange={this.handleChange} value={this.state.size}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </RadioGroup>
          <Button type="primary" size={this.state.size}>Primary</Button>
          <Button size={this.state.size}>Default</Button>
          <Button  type="dashed" size={this.state.size}>Dashed</Button>
          <Button type="danger" size={this.state.size}>Danger</Button>
        </Card>
      </div>
    )
  }
}