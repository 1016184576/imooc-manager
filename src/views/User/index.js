import React from 'react';
import { Card, Form, Button, Message, Radio, Select, Table, Modal, Input, DatePicker } from "antd";
import moment from 'moment';
import { sexConfig, statusConfig, interestConfig, isMarryConfig } from '../../config/fieldRenderConfig';
import Utils from '../../utils/utils';
import { getEmployeeList, editEmployee, addEmployee } from './../../api/user';
import FilterForm from '../../components/FilterForm';
import "./index.less";

const { Option } = Select;

export default class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {},
      selectedRow: {},
      detailVisible: false,
      addEditVisible: false,
      addEditType: 'add',
      addEditObject: {}
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
  }, {
    type: 'INPUT',
    label: '',
    width: 170,
    placeholder: '请输入密码',
    field: 'password',
    initialValue: ''
  }]

  //查询提交请求
  handleQuerySubmit = (fieldValues) => {
    this.loadEmployeeList();
  }

  componentWillMount() {
    this.loadEmployeeList();
  }

  //获取员工管理列表数据
  loadEmployeeList = () => {
    getEmployeeList({
      params: this.params
    }).then(res => {
      this.setState({
        dataSource: res.data.list,
        pagination: Utils.pagination(res.data, (page, pageSize) => {
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
    this.commonHandle(() => {
      Modal.confirm({
        title: '确定要删除此用户吗？',
        okText: '确认',
        cancelText: '取消',
        width: 300,
        onOk: () => {
          this.loadEmployeeList();
          this.setState({
            selectedRowKeys: [],
            selectedRow: {},
          })
        }
      })
    })
  }

  //员工详情
  detailUserHandle = () => {
    this.commonHandle(() => {
      this.setState({
        detailVisible: true
      })
    })
  }

  //需要做选中判断的公用方法
  commonHandle = callback => {
    if (JSON.stringify(this.state.selectedRow) !== '{}') {
      if (callback) callback();
    } else {
      Modal.info({
        title: "温馨提示",
        content: "请先选择用户",
        cancelText: '',
        okText: '关闭',
        width: 320
      })
    }
  }

  //触发弹框事件处理方法
  addEditHandle = type => {
    if (this.AddEditForm) this.AddEditForm.props.form.resetFields();
    if (type === 'add') {
      this.setState({
        addEditType: type,
        addEditVisible: true,
        addEditObject: {}
      })
    } else {
      this.commonHandle(() => {
        this.setState((prevState, props) => ({
          addEditType: type,
          addEditVisible: true,
          addEditObject: prevState.selectedRow
        }))
      })
    }
  }

  //提交编辑或者修改结果
  addEditSubmit = () => {
    const { validateFields } = this.AddEditForm.props.form;
    validateFields((err, values) => {
      if (!err) {
        let params = values;
        params.birthday = values.birthday.format('YYYY-MM-DD');
        if (this.state.addEditType === 'add') {
          addEmployee(params).then(res => {
            if (res.data) {
              this.setState({
                addEditVisible: false,
                selectedRowKeys: [],
                selectedRow: {}
              })
              Message.success('添加成功！')
            }
          })
        } else {
          editEmployee(Object.assign(params, {
            id: this.state.addEditObject.id
          })).then(res => {
            if (res.data) {
              this.setState({
                addEditVisible: false,
                selectedRowKeys: [],
                selectedRow: {}
              })
              Message.success('修改成功！')
            }
          })
        }
      }
    })

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

    const labelCol = { xs: 24, sm: 5 },
      wrapperCol = { xs: 24, sm: 12 };

    return (
      <div className="user-warp">
        <Card className="card">
          <FilterForm formList={this.formList} hideReset={true} handleSubmit={this.handleQuerySubmit} />
        </Card>
        <Card>
          <Button type="primary" onClick={() => {
            this.addEditHandle('add')
          }}>
            创建员工
          </Button>
          <Button type="primary" onClick={() => {
            this.addEditHandle('edit')
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
        <a id="id_quhuainit" style={{ display: "block", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} href="/">
        </a>
        <div className="contend-warp">
          <Table
            columns={columns}
            dataSource={this.state.dataSource}
            bordered
            rowKey="id"
            rowSelection={rowSelection}
            onRow={this.onRow}
            pagination={this.state.pagination}
          >
          </Table>
        </div>

        <Modal
          visible={this.state.detailVisible}
          title="查看详情"
          width={800}
          cancelText="取消"
          okText="确认"
          onOk={() => {
            this.setState({
              detailVisible: false
            })
          }}
          onCancel={() => {
            this.setState({
              detailVisible: false
            })
          }}
        >
          <Form
            layout="horizontal"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Form.Item label="姓名:">
              <span>{this.state.selectedRow.userName}</span>
            </Form.Item>
            <Form.Item label="性别:">
              <span>{sexConfig[this.state.selectedRow.sex]}</span>
            </Form.Item>
            <Form.Item label="状态:">
              <span>{statusConfig[this.state.selectedRow.status]}</span>
            </Form.Item>
            <Form.Item label="生日:">
              <span>{this.state.selectedRow.birthday}</span>
            </Form.Item>
            <Form.Item label="联系地址:">
              <span>{this.state.selectedRow.address}</span>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          visible={this.state.addEditVisible}
          title={`${this.state.addEditType === 'add' ? '创建' : '编辑'}员工`}
          width={800}
          cancelText="取消"
          okText={`${this.state.addEditType === 'add' ? '创建' : '编辑'}`}
          onOk={this.addEditSubmit}
          onCancel={() => {
            this.setState({
              addEditVisible: false
            })
          }}
        >
          <AddEditForm wrappedComponentRef={(AddEditForm) => {
            this.AddEditForm = AddEditForm;
          }} addEditObject={this.state.addEditObject}></AddEditForm>
        </Modal>
      </div>
    )
  }
}

//弹出框表单组件
class OpenForm extends React.Component {
  render() {
    const { addEditObject, form: { getFieldDecorator } } = this.props;
    const labelCol = { span: 5 },
      wrapperCol = { span: 16 };
    return (
      <Form layout="horizontal"
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        <Form.Item label="姓名">
          {
            getFieldDecorator('userName', {
              rules: [
                { required: true, message: '请输入姓名' }
              ],
              initialValue: addEditObject.userName
            })(
              <Input placeholder="请输入姓名" />
            )
          }
        </Form.Item>
        <Form.Item label="性别">
          {
            getFieldDecorator('sex', {
              rules: [
                { required: true, message: '请选择性别' }
              ],
              initialValue: addEditObject.sex ? addEditObject.sex : 1
            })(
              <Radio.Group>
                {
                  Object.keys(sexConfig).reverse().map((key) => {
                    return <Radio key={key} value={parseInt(key)}>{sexConfig[key]}</Radio>
                  })
                }
              </Radio.Group>
            )
          }
        </Form.Item>
        <Form.Item label="状态">
          {
            getFieldDecorator('status', {
              rules: [
                { required: true, message: '请选择状态' }
              ],
              initialValue: addEditObject.status
            })(
              <Select>
                {
                  Object.keys(statusConfig).map((key) => {
                    return <Option value={parseInt(key)} key={key}>{statusConfig[key]}</Option>
                  })
                }
              </Select>
            )
          }
        </Form.Item>
        <Form.Item label='生日' key='birthday'>
          {
            getFieldDecorator('birthday', {
              rules: [
                { required: true, message: '请选择生日' }
              ],
              initialValue: addEditObject.birthday ? moment(addEditObject.birthday) : moment(new Date())
            })(
              <DatePicker format="YYYY-MM-DD" />
            )
          }
        </Form.Item>
        <Form.Item label="联系地址">
          {
            getFieldDecorator('address', {
              rules: [
                { required: true, message: '请输入联系地址' }
              ],
              initialValue: addEditObject.address
            })(
              <Input.TextArea rows={3} placeholder="请输入联系地址" />
            )
          }
        </Form.Item>
      </Form>
    )
  }
}

const AddEditForm = Form.create({ name: 'openForm' })(OpenForm);