import React from 'react';
import { Card, Table, Modal, Button, Message } from "antd";
import "./index.less";

import axios from '../../../axios/axios';
import { sexConfig, statusConfig, interestConfig, isMarryConfig } from '../../../config/fieldRenderConfig';

import Utils from '../../../utils/utils';

export default class BasicTable extends React.Component {
  constructor(props) {
    super(props)
    this.params = {
      page: 1,
      pageSize: 10
    }
    this.state = {
      selectedCheckRowKeys: [],
      pagination: {},
    }
  }

  componentWillMount() {
    let data = [
      {
        id: '1',
        userName: 'jack',
        sex: '1',
        status: '1',
        interest: '2',
        isMarry: '0',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00:00'
      }, {
        id: '2',
        userName: 'peter',
        sex: '0',
        status: '3',
        interest: '6',
        isMarry: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00:00'
      }, {
        id: '3',
        userName: 'wendy',
        sex: '1',
        status: '2',
        interest: '4',
        isMarry: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00:00'
      }, {
        id: '4',
        userName: 'rose',
        sex: '0',
        status: '2',
        interest: '5',
        isMarry: '0',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00:00'
      }, {
        id: '5',
        userName: 'jeckson',
        sex: '0',
        status: '4',
        interest: '1',
        isMarry: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00:00'
      }
    ];

    this.setState({
      dataSource1: data
    })
    this.getList();
  }

  getList() {
    axios.ajax({
      url: '/table/basic/getList',
      params: this.params
    }).then(res => {
      this.setState({
        dataSource2: res.data.list,
        selectedCheckRowKeys: [],
        selectedRows: null,
        pagination: Utils.pagination(res.data,(page, pageSize)=>{
          this.params = {
            page,
            pageSize
          }
          this.getList()
        })
      })
    })
  }

  onRow = (record) => {
    return {
      // 点击行
      onClick: (event) => {
       /*  Modal.info({
          title: '提示',
          content: `用户名是:${record.userName},性别:${record.sex},爱好:${record.interest}`
        }) */
        this.setState({
          selectedRowKeys: [record.id]
        })
      }
    }
  }

  checkOnRow = (record) => {
    return {
      // 点击行
      onClick: (event) => {
        let selectedCheckRowKeys = this.state.selectedCheckRowKeys;
        selectedCheckRowKeys.push(record.id)
        this.setState({
          selectedCheckRowKeys
        })
      }
    }
  }

  //删除复选框表格数据
  handleDelete = () => {
    if (this.state.selectedCheckRowKeys.length > 0) {
      Modal.info({
        title: '确认删除？',
        content: `确认删除用户${this.state.selectedCheckRowKeys.join(',')}`,
        onOk: () => {
          Message.success('删除成功');
          this.getList();
        }
      })
    } else {
      Modal.error({
        title: '提示',
        content: '请选择要删除的用户'
      })
    }
  }



  render() {
    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      align: 'center'
    }, {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center'
    }, {
      title: '性别',
      dataIndex: 'sex',
      align: 'center',
      render: (sex) => {
        return sexConfig[sex];
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      align: 'center',
      render: (status) => {
        return statusConfig[status];
      }
    }, {
      title: '爱好',
      dataIndex: 'interest',
      align: 'center',
      render: (interest) => {
        return interestConfig[interest];
      }
    }, {
      title: '是否已婚',
      dataIndex: 'isMarry',
      align: 'center',
      render: (isMarry) => {
        return isMarryConfig[isMarry];
      }
    }, {
      title: '生日',
      dataIndex: 'birthday',
      align: 'center'
    }, {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center'
    }, {
      title: '早起时间',
      dataIndex: 'time',
      align: 'center'
    }]

    let rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'radio'
    };

    let rowCheckSelection = {
      selectedRowKeys: this.state.selectedCheckRowKeys,
      type: 'checkbox',
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedCheckRowKeys: selectedRowKeys,
          selectedRows
        })
      }
    };

    return (
      <div className="table-basic-warp">
        <Card title="基础表格" className="card">
          <Table
            columns={columns}
            dataSource={this.state.dataSource1}
            bordered
            rowKey="id"
            pagination={false}
          ></Table>
        </Card>
        <Card title="Mock表格" className="card">
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            rowKey="id"
            pagination={false}
          ></Table>
        </Card>
        <Card title="Mock表格-单选" className="card">
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            rowKey="id"
            pagination={false}
            rowSelection={rowSelection}
            onRow={this.onRow}
          ></Table>
        </Card>
        <Card title="Mock表格-多选" className="card">
          <div style={{ marginBottom: '10px' }}>
            <Button type="danger" onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            rowKey="id"
            pagination={false}
            rowSelection={rowCheckSelection}
            onRow={this.checkOnRow}
          ></Table>
        </Card>
        <Card title="Mock表格-分页" className="card">
          <Table
            columns={columns}
            dataSource={this.state.dataSource2}
            bordered
            rowKey="id"
            pagination={this.state.pagination}
          ></Table>
        </Card>
      </div>
    )
  }
}