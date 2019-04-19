import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuList from "../../config/menuConfig";
import { Menu } from 'antd';
import './index.less';

const { SubMenu } = Menu;
export default class NavLeft extends Component {
  constructor(props){
    super(props);
    this.state = {
      nodeTreeList: []
    }
  } 
  componentWillMount(){
    let nodeTreeList = this.rednerMenu(menuList);
    this.setState({
      nodeTreeList
    })
  }
  //递归渲染菜单
  rednerMenu = (menuData) => {
    return menuData.map(item => {
      //判断是否有子级元素
      if(item.children){
        return (
          <SubMenu key={item.key} title={<span className="nav-text">{item.title}</span>}>
            { this.rednerMenu(item.children) }
          </SubMenu> 
        )
      }
      return (
        <Menu.Item key={item.key}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="logo">
          <img src="/assets/logo-ant.svg" alt=""/>
          <h1>Imooc MS</h1>
        </div>
        <Menu 
          mode="inline"
          theme="dark"
          defaultOpenKeys={[menuList[0].key]}
        >
            { this.state.nodeTreeList }
        </Menu>
      </div>
    )
  }
}