import React from 'react';
import { Card, Form, Button, Message, Radio, Select, Table, Modal } from "antd";
import { cityConfig, carModeConfig, opModeConfig, authConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import { getCityList } from './../../api/city';
import FilterForm from '../../components/FilterForm';
import "./index.less";

const { Option } = Select;

export default class City extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination:{}
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
  },{
    type: 'SELECT',
    label: '用车模式',
    width: 150,
    placeholder: '请选择',
    field: 'carMode',
    initialValue: '0',
    list: Object.keys(carModeConfig).map((key) => {
      return {
        id: key,
        text: carModeConfig[key]
      }
    })
  },{
    type: 'SELECT',
    label: '运营模式',
    width: 100,
    placeholder: '请选择',
    field: 'opMode',
    initialValue: '0',
    list: Object.keys(opModeConfig).map((key) => {
      return {
        id: key,
        text: opModeConfig[key]
      }
    })
  } , {
    type: 'SELECT',
    label: '加盟商授权状态',
    width: 100,
    placeholder: '请选择',
    field: 'auth',
    initialValue: '0',
    list: Object.keys(authConfig).map((key) => {
      return {
        id: key,
        text: authConfig[key]
      }
    })
  }]

  //开通城市提交请求
  handleQuerySubmit = (fieldValues) => {
    console.log(fieldValues)
    this.getOpenCityList();
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
    getCityList({
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
          <FilterForm formList={this.formList} handleSubmit={this.handleQuerySubmit} />
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