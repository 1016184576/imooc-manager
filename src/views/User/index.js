import React from 'react';
import { Card, Form, Button, Message, Radio, Select, Table, Modal, Row, Col } from "antd";
import { cityConfig, carModeConfig, opModeConfig, sexConfig, statusConfig, interestConfig,isMarryConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import { getEmployeeList } from './../../api/user';
import FilterForm from '../../components/FilterForm';
import "./index.less";

const { Option } = Select;

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination:{},
      detailVisible:false,
      selectedRow:{},
    }
  }

  params = {
    page: 1,
    pageSize: 10
  }

  formList = [{
    type: 'INPUT',
    label: '',
    width: 170,
    placeholder: '请输入用户名',
    field: 'username',
    initialValue: ''
  },{
    type: 'INPUT',
    label: '',
    width: 170,
    placeholder: '请输入密码',
    field: 'password',
    initialValue: ''
  }]

  //开通城市提交请求
  handleQuerySubmit = (fieldValues) => {
    console.log(fieldValues)
    this.loadEmployeeList();
  }

  componentWillMount(){
    this.loadEmployeeList();
  }

  //开通城市提交请求
  handleSubmit = (e) => {
    e.preventDefault();
    //const fomrFieldsValue = this.OpenCityForm.props.form.getFieldsValue();
    this.loadEmployeeList();
    Message.success(`开通成功`)
  }

  //获取员工管理列表数据
  loadEmployeeList = () => {
    getEmployeeList({
      params: this.params
    }).then(res => {
      this.setState({
        dataSource: res.data.list,
        pagination: Utils.pagination(res.data,(page, pageSize)=>{
          this.params = {
            page,
            pageSize
          }
          this.loadEmployeeList()
        })
      })
    })
  }

  onRow = (record) => {
    return {
      // 点击行
      onClick: (event) => {
        this.setState({
          selectedRowKeys: [record.id],
          selectedRow: record
        })
      }
    }
  }

  //删除员工
  deleteUserHandle = () => {
    this.commonHandle(()=>{
      this.loadEmployeeList()
      this.setState({
        selectedRowKeys: [],
        selectedRow: {}
      });
    })
  }

  //员工详情
  detailUserHandle = () =>{
    this.commonHandle(()=>{
      this.setState({
        detailVisible:true
      })
    })
  }

  //需要做选中判断的公用方法
  commonHandle = callback => {
    if(this.state.selectedRow){
      if(callback)callback();
    }else{
      Modal.info({
        title: "温馨提示",
        content: "请先选择用户",
        cancelText: '',
        okText: '关闭',
        width: 320
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
    }];

    let rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'radio'
    };

    return (
      <div className="user-warp">
        <Card className="card">
          <FilterForm formList={this.formList} handleSubmit={this.handleQuerySubmit} />
        </Card>
        <Card>
          <Button type="primary" onClick={()=>{
            this.setState({
              visible:true
            })
          }}>
            创建员工
          </Button>
          <Button type="primary" onClick={()=>{
            this.setState({
              visible:true
            })
          }}>
            编辑员工
          </Button>
          <Button type="primary" onClick={this.detailUserHandle}>
            员工详情
          </Button>
          <Button type="danger" onClick={this.deleteUserHandle}>
            删除员工
          </Button>
        </Card>
        <a id="id_quhuainit" style={{display: "block", position: "absolute", top:"50%", left:"50%", transform: "translate(-50%,-50%)"}} href="/">
        </a>
        <div className="contend-warp">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            rowKey="id"
            pagination={false}
            rowSelection={rowSelection}
            onRow={this.onRow}
            pagination={this.state.pagination}
          >
          </Table>
        </div>
        <Modal
          visible={this.state.detailVisible}
          title="查看详情"
          cancelText="取消"
          okText="确认"
          onOk={()=>{
            this.setState({
              detailVisible:false
            })
          }}
          onCancel={()=>{
            this.setState({
              detailVisible:false
            })
          }}
        >
            <Row>
              <Col>姓名:</Col>
              <Col>{this.state.selectedRow.userName}</Col>
            </Row>
            <Row>
              <Col>姓名:</Col>
              <Col>{this.state.selectedRow.userName}</Col>
            </Row>
            <Row>
              <Col>姓名:</Col>
              <Col>{this.state.selectedRow.userName}</Col>
            </Row>
            <Row>
              <Col>姓名:</Col>
              <Col>{this.state.selectedRow.userName}</Col>
            </Row>
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