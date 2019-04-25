import React from 'react';
import { Card, Form, Button, Message, DatePicker, Select, Row, Col, Table, Modal } from "antd";
import { cityConfig, orderStatusConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import axios from '../../axios/axios';
import moment from 'moment';
import "./index.less";

const { Option } = Select;

export default class Order extends React.Component {
  constructor(props) {
    super(props)
    this.params = {
      page: 1,
      pageSize: 10
    }
    this.state = {
      pagination:{},
      selectedRowKeys:[]
    }
  }

  componentWillMount(){
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
    axios.ajax({
      url: '/order_list',
      params: this.params
    }).then(res => {
      this.setState({
        dataSource: res.data.list,
        pagination: Utils.pagination(res.data,(page, pageSize)=>{
          this.params = {
            page,
            pageSize
          }
          this.getOrderList()
        })
      })
    })
  }

  //重置搜索表单
  resetSearchForm = () => {
    this.searchForm.props.form.resetFields()
  }

  //结束订单方法
  handleEndOrder = () => {
    if(this.state.selectedRowKeys.length >　0){
      /* Message.success('')
      this.getOrderList() */
    }else{
      Modal.info({
        title:"温馨提示",
        content:"请选择要结束的订单",
        cancelText:'',
        okText:'关闭',
        width: 320
      })
    }
  }

  handleOrderDetail = () => {

  }

  onRow = (record) => {
    return {
      // 点击行
      onClick: (event) => {
        this.setState({
          selectedRowKeys: [record.orderNo]
        })
      }
    }
  }

  render() {
    const columns = [{
      title: '订单编号',
      dataIndex: 'orderNo',
      align: 'center',
      render(orderNo){
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
      render(mileage){
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
      render(orderStatus){
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
      render(orderAmount){
        return `${orderAmount}.00`;
      }
    }, {
      title: '实付金额',
      dataIndex: 'payAmount',
      align: 'center',
      render(payAmount){
        return `${payAmount}.00`;
      }
    }]
    const rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'radio'
    };
    return (
      <div className="order-warp">
        <Card className="card">
          <Row>
            <Col xl={13} lg={24}>
              <SearchForm wrappedComponentRef={(searchForm)=>{
                this.searchForm = searchForm;
              }}/>
            </Col>
            <Col xl={5} lg={24}>
              <Form layout="inline">
                <Form.Item>
                  <Button type="primary" onClick={this.getOrderList}>查询</Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={this.resetSearchForm}>重置</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
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
      </div>
    )
  }
}

//头部的搜索表单组件
class HeaderForm extends React.Component {
  render(){
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <Form.Item label="城市">
          {
            getFieldDecorator('city', {
              initialValue: '0'
            })(
              <Select style={{width:80}}>
                <Option value="0">全部</Option>
                {
                  Object.keys(cityConfig).map((key)=>{
                    return <Option key={key} value={key}>{cityConfig[key]}</Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('startdate', {
              initialValue: moment(new Date())
            })(
              <DatePicker />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            getFieldDecorator('enddate', {
              initialValue: moment(new Date())
            })(
              <DatePicker />
            )
          }
        </Form.Item>
        <Form.Item label="订单状态">
          {
            getFieldDecorator('orderStatus', {
              initialValue: '0'
            })(
              <Select style={{width:150}}>
                <Option value="0">全部</Option>
                {
                  Object.keys(orderStatusConfig).map((key)=>{
                    return <Option key={key} value={key}>{orderStatusConfig[key]}</Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

const SearchForm = Form.create({ name: 'searchForm' })(HeaderForm);
