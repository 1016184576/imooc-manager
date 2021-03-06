import React from 'react';
import { Card, Form, Button, Message, Table, Modal } from "antd";
import { cityConfig, orderStatusConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import { getOrderList } from '../../api/order'
import FilterForm from '../../components/FilterForm';
import "./index.less";

export default class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {},
      selectedRowKeys: [],
      selectedRow: {},
      visible: false
    }
  }

  params = {
    page: 1,
    pageSize: 10
  }

  formList = [{
    type: 'SELECT',
    label: '城市',
    width: 100,
    placeholder: '请选择',
    field: 'city',
    initialValue: '0',
    list: Object.keys(cityConfig).map((key) => {
      return {
        id: key,
        text: cityConfig[key]
      }
    })
  }, {
    type: 'TIME',
    width: 200,
    placeholder: '请选择时间'
  }, {
    type: 'SELECT',
    label: '订单状态',
    width: 150,
    placeholder: '请选择',
    field: 'order_status',
    initialValue: '0',
    list: Object.keys(orderStatusConfig).map((key) => {
      return {
        id: key,
        text: orderStatusConfig[key]
      }
    })
  }]

  handleQuerySubmit = (fieldValues) => {
    console.log(fieldValues)
    this.getOrderList();
  }

  componentWillMount() {
    this.getOrderList();
  }

  //开通城市提交请求
  handleSubmit = (e) => {
    e.preventDefault();
    //const fomrFieldsValue = this.OpenCityForm.props.form.getFieldsValue();
    this.getOrderList();
    Message.success(`开通成功`)
  }



  //获取开通城市列表数据
  getOrderList = () => {
    getOrderList({
      params: this.params
    }).then(res => {
      this.setState({
        dataSource: res.data.list,
        pagination: Utils.pagination(res.data, (page, pageSize) => {
          this.params = {
            page,
            pageSize
          }
          this.getOrderList()
        })
      })
    })
  }

  //结束订单弹出方法
  handleEndOrder = () => {
    if (this.state.selectedRowKeys.length > 0) {
      if (this.state.selectedRow.orderStatus === 3) {
        Modal.info({
          title: "温馨提示",
          content: "该订单行程已结束",
          cancelText: '',
          okText: '关闭',
          width: 320
        })
      } else {
        this.setState({
          visible: true
        })
      }
    } else {
      Modal.info({
        title: "温馨提示",
        content: "请选择要结束的订单",
        cancelText: '',
        okText: '关闭',
        width: 320
      })
    }
  }

  

  //结束订单方法
  handleSubmitEndOrder = () => {
    this.setState({
      visible: false
    })
    Message.success("订单已结束");
    this.getOrderList();
  }

  handleOrderDetail = () => {
    if (this.state.selectedRowKeys.length > 0) {
      window.open(`/common/order/detail/${this.state.selectedRow.orderNo}`, "_blank");
    } else {
      Modal.info({
        title: "温馨提示",
        content: "请先选择订单",
        cancelText: '',
        okText: '关闭',
        width: 320
      })
    }
  }

  onRow = (record) => {
    return {
      // 点击行
      onClick: (event) => {
        this.setState({
          selectedRowKeys: [record.orderNo],
          selectedRow: record
        })
      }
    }
  }

  render() {
    const columns = [{
      title: '订单编号',
      dataIndex: 'orderNo',
      align: 'center',
      render(orderNo) {
        return `T${orderNo}`;
      }
    }, {
      title: '车辆编号',
      dataIndex: 'carNo',
      align: 'center'
    }, {
      title: '用户名',
      dataIndex: 'username',
      align: 'center'
    }, {
      title: '手机号码',
      dataIndex: 'phone',
      align: 'center'
    }, {
      title: '里程',
      dataIndex: 'mileage',
      align: 'center',
      render(mileage) {
        return `${mileage}km`;
      }
    }, {
      title: '行程时长',
      dataIndex: 'drivingTime',
      align: 'center'
    }, {
      title: '状态',
      dataIndex: 'orderStatus',
      align: 'center',
      render(orderStatus) {
        return orderStatusConfig[orderStatus];
      }
    }, {
      title: '开始时间',
      dataIndex: 'startDate',
      align: 'center'
    }, {
      title: '结束时间',
      dataIndex: 'endDate',
      align: 'center'
    }, {
      title: '订单金额',
      dataIndex: 'orderAmount',
      align: 'center',
      render(orderAmount) {
        return `${orderAmount}.00`;
      }
    }, {
      title: '实付金额',
      dataIndex: 'payAmount',
      align: 'center',
      render(payAmount) {
        return `${payAmount}.00`;
      }
    }]
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'radio'
    };
    const labelCol = { xs: 24, sm: 6 },
      wrapperCol = { xs: 24, sm: 12 };
    return (
      <div className="order-warp">
        <Card className="card">
          <FilterForm formList={this.formList} handleSubmit={this.handleQuerySubmit}/>
        </Card>
        <Card>
          <Button type="primary" className="button" onClick={this.handleOrderDetail}>
            订单详情
          </Button>
          <Button type="primary" className="button" onClick={this.handleEndOrder}>
            结束订单
          </Button>
        </Card>
        <div className="contend-warp">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            rowKey="orderNo"
            pagination={this.state.pagination}
            rowSelection={rowSelection}
            onRow={this.onRow}
          >
          </Table>
        </div>
        <Modal
          visible={this.state.visible}
          title="结束订单"
          okText="结束订单"
          cancelText="取消"
          onOk={this.handleSubmitEndOrder}
          onCancel={() => {
            this.setState({
              visible: false
            })
          }}
        >
          <Form
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Form.Item label="车辆编号">
              {this.state.selectedRow.carNo}
            </Form.Item>
            <Form.Item label="剩余电量">
              100%
            </Form.Item>
            <Form.Item label="行程开始时间">
              {this.state.selectedRow.startDate}
            </Form.Item>
            <Form.Item label="当前位置">
              北京市海淀区奥林匹克公园
            </Form.Item>
          </Form>

        </Modal>
      </div>
    )
  }
}
