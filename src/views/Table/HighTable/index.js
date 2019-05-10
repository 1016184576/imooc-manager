import React from 'react';
import { Card, Table, Modal, Button, Message } from "antd";
import "./index.less";

import { getFixedHeaderData, getFixedColumnData } from '../../../api/table';
import { sexConfig, statusConfig, interestConfig, isMarryConfig } from '../../../config/fieldRenderConfig';


export default class HighTable extends React.Component {
  constructor(props) {
    super(props)
    this.params = {
      page: 1,
      pageSize: 10
    }
    this.state = {
    }
  }

  componentWillMount() {
    this.getFixedHeadertList();
    this.getFixedColumntList();
  }

  //获取固定头部类型列表数据
  getFixedHeadertList() {
    getFixedHeaderData({
      params: this.params
    }).then(res => {
      this.setState({
        dataSource1: res.data.list,
      })
    })
  }

  //获取固定列类型列表数据
  getFixedColumntList() {
    getFixedColumnData({
      params: this.params
    }).then(res => {
      this.setState({
        dataSource2: res.data.list,
      })
    })
  }

  onChange = (pagination, filters, sorter) => {
    this.setState({
      order: sorter.order
    })
  }

  handleDelete = (row) => {
    Modal.confirm({
      title:'确认删除',
      content:`确认删除用户${row.userName}吗?`,
      onOk:() => {
        Message.success('删除成功！');
        this.getFixedHeadertList();
      }
    })
  }


  render() {
    const columns1 = [
      {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 120
    }, {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      width: 150
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render: (sex) => {
        return sexConfig[sex];
      },
      width: 150
    }, {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      width: 120
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        return statusConfig[status];
      },
      width: 150
    }, {
      title: '爱好',
      dataIndex: 'interest',
      align: 'center',
      render: (interest) => {
        return interestConfig[interest];
      },
      width: 150
    }, {
      title: '是否已婚',
      dataIndex: 'isMarry',
      align: 'center',
      render: (isMarry) => {
        return isMarryConfig[isMarry];
      },
      width: 150
    }, {
      title: '生日',
      dataIndex: 'birthday',
      align: 'center',
      width: 180
    }, {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center',
      width: 220
    }, {
      title: '早起时间',
      dataIndex: 'time',
      align: 'center',
      width: 180
    }]

    const columns2 = [
      {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      fixed: 'left',
      width: 120
    }, {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      fixed: 'left',
      width: 150
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render: (sex) => {
        return sexConfig[sex];
      },
      width: 150
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        return statusConfig[status];
      },
      width: 150
    }, {
      title: '爱好',
      dataIndex: 'interest',
      align: 'center',
      render: (interest) => {
        return interestConfig[interest];
      },
      width: 150
    }, {
      title: '是否已婚',
      dataIndex: 'isMarry',
      align: 'center',
      render: (isMarry) => {
        return isMarryConfig[isMarry];
      },
      width: 150
    }, {
      title: '生日',
      dataIndex: 'birthday',
      align: 'center',
      width: 180
    }, {
      title: '生日',
      dataIndex: 'birthday1',
      align: 'center',
      width: 180
    }, {
      title: '生日',
      dataIndex: 'birthday2',
      align: 'center',
      width: 180
    }, {
      title: '生日',
      dataIndex: 'birthday3',
      align: 'center',
      width: 180
    }, {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center',
      width: 220
    }, {
      title: '早起时间',
      dataIndex: 'time',
      align: 'center',
      fixed: 'right',
      width: 180
    }]
    
    const columns3 = [
      {
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 120
    }, {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      width: 150
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render: (sex) => {
        return sexConfig[sex];
      },
      width: 150
    }, {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      width: 120,
      sorter: (a, b) => a.age - b.age,
      sortOrder: this.state.order
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        return statusConfig[status];
      },
      width: 150
    }, {
      title: '爱好',
      dataIndex: 'interest',
      align: 'center',
      render: (interest) => {
        return interestConfig[interest];
      },
      width: 150
    }, {
      title: '是否已婚',
      dataIndex: 'isMarry',
      align: 'center',
      render: (isMarry) => {
        return isMarryConfig[isMarry];
      },
      width: 150
    }, {
      title: '生日',
      dataIndex: 'birthday',
      align: 'center',
      width: 180
    }, {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center',
      width: 220
    }, {
      title: '早起时间',
      dataIndex: 'time',
      align: 'center',
      width: 180
    }]

    const columns4 = [{
      title: 'ID',
      dataIndex: 'id',
      align: 'center',
      width: 120
    }, {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center',
      width: 150
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render: (sex) => {
        return sexConfig[sex];
      },
      width: 150
    }, {
      title: '年龄',
      dataIndex: 'age',
      align: 'center',
      width: 120
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        return statusConfig[status];
      },
      width: 150
    }, {
      title: '爱好',
      dataIndex: 'interest',
      align: 'center',
      render: (interest) => {
        return interestConfig[interest];
      },
      width: 150
    }, {
      title: '是否已婚',
      dataIndex: 'isMarry',
      align: 'center',
      render: (isMarry) => {
        return isMarryConfig[isMarry];
      },
      width: 150
    }, {
      title: '生日',
      dataIndex: 'birthday',
      align: 'center',
      width: 180
    }, {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center',
      width: 220
    }, {
      title: '早起时间',
      dataIndex: 'time',
      align: 'center',
      width: 180
    }, {
      title: '操作',
      align: 'center',
      width: 180,
      render:(text, row) => {
        return <Button type="danger" size="small" onClick={() => {this.handleDelete(row)}} icon="delete">删除</Button>
      }
    }]

    return (
      <div className="table-high-warp">
        <Card title="头部固定" className="card">
          <Table
            columns={columns1}
            dataSource={this.state.dataSource1}
            bordered
            rowKey="id"
            pagination={false}
            scroll={{ y: 320 }} 
          ></Table>
        </Card>
        <Card title="列固定" className="card">
          <Table
            columns={columns2}
            dataSource={this.state.dataSource2}
            bordered
            rowKey="id"
            pagination={false}
            scroll={{ x: 2000 }} 
          ></Table>
        </Card>
        <Card title="排序" className="card">
          <Table
            columns={columns3}
            dataSource={this.state.dataSource1}
            bordered
            rowKey="id"
            pagination={false}
            onChange={this.onChange}
          ></Table>
        </Card>
        <Card title="操作按钮" className="card">
          <Table
            columns={columns4}
            dataSource={this.state.dataSource1}
            bordered
            rowKey="id"
            pagination={false}
          ></Table>
        </Card>
      </div>
    )
  }
}