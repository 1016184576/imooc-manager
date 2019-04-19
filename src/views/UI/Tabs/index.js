import React from 'react';
import { Card, Tabs, Message, Icon } from "antd"
import "./index.less";

const TabPane = Tabs.TabPane;

export default class MyTabs extends React.Component {

  constructor(props){
    super(props)
    this.newIndex = 0;
    let panes = [
      { title: 'Tab 1', content: 'Content of Tab 1', key: '1' },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
      {
        title: 'Tab 3', content: 'Content of Tab 3', key: '3', closable: false,
      },
    ];
    this.state = {
      activeKey: panes[0].key,
      panes
    }
  }
  callback = (activeKey) => {
    Message.info(`Hi，您选择了页签:${activeKey}`);
  }

  onChange = (activeKey)=>{
    this.setState({ activeKey })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    let index = ++this.newIndex;
    const activeKey = `newTab${index}`;
    panes.push({ title: `New Tab${index}`, content: `Content of new Tab${index}`, key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (panes.length && activeKey === targetKey) {
      if (lastIndex >= 0) {
        activeKey = panes[lastIndex].key;
      } else {
        activeKey = panes[0].key;
      }
    }
    this.setState({ panes, activeKey });
  }


  render() {
    return (
      <div className="tabs-warp">
        <Card title="Tab页签" className="card">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
            <TabPane tab="Tab 2" disabled key="2">Tab 2</TabPane>
            <TabPane tab="Tab 3" key="3">React是一门非常受欢迎的MV*框架</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图标页签" className="card">
          <Tabs defaultActiveKey="1" onChange={this.callback}>
            <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">
              创建属于你的React项目
            </TabPane>
            <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">
              尝试如何使用React进行修改
            </TabPane>
            <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">
              删除它，就这么简单
            </TabPane>
          </Tabs>
        </Card>
        <Card title="Tab可关闭卡片式页签" className="card">
            <Tabs
              type="editable-card"
              onChange={this.onChange}
              activeKey={this.state.activeKey}
              onEdit={this.onEdit}
            >
              {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        </Card>
      </div>
    )
  }
}