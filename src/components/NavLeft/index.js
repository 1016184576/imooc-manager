import React, { Component } from "react";
import { Link } from "react-router-dom";
import menuList from "../../config/menuConfig";
import { switchMenuAction } from '../../redux/action'
import { connect } from 'react-redux';
import { Menu } from 'antd';
import './index.less';

const { SubMenu } = Menu;
class NavLeft extends Component {
  constructor(props){
    super(props);
    this.state = {
      nodeTreeList: []
    }
  } 
  componentWillMount(){
    let nodeTreeList = this.rednerMenu(menuList);
    let initMenu = this.getInitMenu(menuList);
    if(!initMenu) {
      initMenu =  {
        title: '首页',
        key: '/home'
      }
    }
    const { dispatch } = this.props;
    dispatch(switchMenuAction(initMenu.title))
    this.setState({
      nodeTreeList,
      selectedKey: initMenu.key
    })
  }

  getInitMenu = (data) => {
    let initMenu = null;
    data.map(item=>{
      if(item.key !== window.location.pathname){
        if(item.children){
          this.getInitMenu(item.children);
        }
      }else{
        initMenu = item;
      }
      return item;
    })
    return initMenu
  }

  handelSelect=({item, key})=>{
    const { dispatch } = this.props;
    dispatch(switchMenuAction(item.props.title))
    this.setState({
      selectedKey: key
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
        <Menu.Item key={item.key} title={item.title}>
          <Link to={item.key} >{item.title}</Link>
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
          selectedKeys={[this.state.selectedKey]}
          onSelect={this.handelSelect}
        >
            { this.state.nodeTreeList }
        </Menu>
      </div>
    )
  }
}

export default connect()(NavLeft)