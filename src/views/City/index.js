import React from 'react';
import { Card, Form, Button, Message, Radio, Select, Row, Col, Table, Modal } from "antd";
import { cityConfig, carModeConfig, opModeConfig, authConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import axios from '../../axios/axios';
import "./index.less";

const { Option } = Select;

export default class City extends React.Component {
  constructor(props) {
    super(props)
    this.params = {
      page: 1,
      pageSize: 10
    }
    this.state = {
      pagination:{}
    }
  }

  componentWillMount(){
    this.getOpenCityList();
  }

  //开通城市提交请求
  handleSubmit = (e) => {
    e.preventDefault();
    //const fomrFieldsValue = this.OpenCityForm.props.form.getFieldsValue();
    this.getOpenCityList();
    Message.success(`开通成功`)
  }

  //获取开通城市列表数据
  getOpenCityList = () => {
    axios.ajax({
      url: '/open_city_list',
      params: this.params
    }).then(res => {
      this.setState({
        dataSource: res.data.list,
        pagination: Utils.pagination(res.data,(page, pageSize)=>{
          this.params = {
            page,
            pageSize
          }
          this.getOpenCityList()
        })
      })
    })
  }

  //重置搜索表单
  resetSearchForm = () => {
    this.searchForm.props.form.resetFields()
  }

  render() {
    const columns = [{
      title: '城市ID',
      dataIndex: 'id',
      align: 'center'
    }, {
      title: '城市名称',
      dataIndex: 'cityName',
      align: 'center'
    }, {
      title: '用车模式',
      dataIndex: 'carMode',
      align: 'center',
      render: (carMode) => {
        return carModeConfig[carMode];
      }
    }, {
      title: '运营模式',
      dataIndex: 'opMode',
      align: 'center',
      render: (opMode) => {
        return opModeConfig[opMode];
      }
    }, {
      title: '授权加盟商',
      dataIndex: 'autoJoin',
      align: 'center'
    }, {
      title: '城市管理员',
      dataIndex: 'cityManager',
      align: 'center',
      render: (cityManager) => {
        return cityManager.map((item)=>{
          return item.userName;
        }).join(',');
      }
    }, {
      title: '城市开通时间',
      dataIndex: 'openDate',
      align: 'center'
    }, {
      title: '操作时间',
      dataIndex: 'updateDate',
      align: 'center'
    }, {
      title: '操作人',
      dataIndex: 'updateSysName',
      align: 'center'
    }]
    return (
      <div className="city-warp">
        <Card className="card">
          <Row>
            <Col xl={12} lg={24}>
              <SearchForm wrappedComponentRef={(searchForm)=>{
                this.searchForm = searchForm;
              }}/>
            </Col>
            <Col xl={5} lg={24}>
              <Form layout="inline">
                <Form.Item>
                  <Button type="primary" onClick={this.getOpenCityList}>查询</Button>
                </Form.Item>
                <Form.Item>
                  <Button onClick={this.resetSearchForm}>重置</Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
        <Card>
          <Button type="primary" onClick={()=>{
            this.setState({
              visible:true
            })
          }}>
            开通城市
          </Button>
        </Card>
        <div className="contend-warp">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            rowKey="id"
            pagination={this.state.pagination}
          >
          </Table>
        </div>
        <Modal
          visible={this.state.visible}
          title="开通城市"
          cancelText="取消"
          okText="开通"
          onOk={this.handleSubmit}
          onCancel={()=>{
            this.setState({
              visible:false
            })
          }}
        >
            <OpenCityForm wrappedComponentRef={(OpenCityForm)=>{
              this.OpenCityForm = OpenCityForm;
            }}></OpenCityForm>
        </Modal>
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
        <Form.Item label="用车模式">
          {
            getFieldDecorator('carMode', {
              initialValue: '0'
            })(
              <Select style={{width:140}}>
                <Option value="0">全部</Option>
                {
                  Object.keys(carModeConfig).map((key)=>{
                    return <Option key={key} value={key}>{carModeConfig[key]}</Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="营运模式">
          {
            getFieldDecorator('opMode', {
              initialValue: '0'
            })(
              <Select style={{width:80}}>
                <Option value="0">全部</Option>
                {
                  Object.keys(opModeConfig).map((key)=>{
                    return <Option key={key} value={key}>{opModeConfig[key]}</Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label="加盟商授权状态">
          {
            getFieldDecorator('auth', {
              initialValue: '0'
            })(
              <Select style={{width:80}}>
                <Option value="0">全部</Option>
                {
                  Object.keys(authConfig).map((key)=>{
                    return <Option key={key} value={key}>{authConfig[key]}</Option>
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


//弹出框表单组件
class OpenForm extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    const labelCol = { span: 5},
    wrapperCol = { span: 19 };
    return(
      <Form layout="horizontal"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Form.Item label="选择城市">
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
        <Form.Item label="营运模式">
          {
            getFieldDecorator('opMode', {
              initialValue: '1'
            })(
              <Radio.Group>
                {
                  Object.keys(opModeConfig).map((key)=>{
                    return <Radio key={key} value={key}>{opModeConfig[key]}</Radio>
                  })
                }
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="用车模式">
          {
            getFieldDecorator('carMode', {
              initialValue: '1'
            })(
              <Radio.Group>
                {
                  Object.keys(carModeConfig).map((key)=>{
                    return <Radio key={key} value={key}>{carModeConfig[key]}</Radio>
                  })
                }
              </Radio.Group>
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

const OpenCityForm = Form.create({ name: 'openForm' })(OpenForm);