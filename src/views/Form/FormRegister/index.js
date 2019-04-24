import React from 'react';
import { Card, Form, Button, Input, Icon, Message, Radio, InputNumber, Select, Switch, DatePicker, TimePicker, Upload, Checkbox } from "antd";
import moment from 'moment';
import "./index.less";



class FormRegister extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        Message.success(`用户${values.userName}登陆成功`)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const labelCol = { xs: 24, sm: 4 },
      wrapperCol = { xs: 24, sm: 12 };
    return (
      <div className="form-register-warp">
        <Card title="注册表单" className="card">
          <Form
            onSubmit={this.handleSubmit}
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Form.Item label="用户名:" className="form-item">
              {
                getFieldDecorator('userName', {
                  rules: [{
                    required: true,
                    message: '请输入用户名!'
                  }]
                })(
                  <Input type="text" placeholder="请输入用户名" />
                )
              }
            </Form.Item>
            <Form.Item label="密码:">
              {
                getFieldDecorator('password', {
                  rules: [{
                    required: true,
                    message: '请输入密码!'
                  }, {
                    max: 16,
                    message: '密码长度不能超过16位!'
                  }, {
                    min: 6,
                    message: '密码长度不能小于6位!'
                  }]
                })(
                  <Input type="password" placeholder="请输入密码" />
                )
              }
            </Form.Item>
            <Form.Item label="性别:">
              {
                getFieldDecorator('sex', {
                  initialValue: '1'
                })(
                  <Radio.Group>
                    <Radio value="1">男</Radio>
                    <Radio value="0">女</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item label="年龄:">
              {
                getFieldDecorator('age', {
                  initialValue: '18'
                })(
                  <InputNumber
                    min={18}
                    max={120}
                  />
                )
              }
            </Form.Item>
            <Form.Item label="当前状态:">
              {
                getFieldDecorator('currentStatus', {
                  initialValue: '0'
                })(
                  <Select>
                    <Select.Option value="0">咸鱼一条</Select.Option>
                    <Select.Option value="1">风华浪子</Select.Option>
                    <Select.Option value="2">北大才子一枚</Select.Option>
                    <Select.Option value="3">百度FE</Select.Option>
                    <Select.Option value="4">创业者</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="爱好:">
              {
                getFieldDecorator('hobby', {
                  initialValue: ['0', '1']
                })(
                  <Select
                    mode="tags"
                  >
                    <Select.Option value="0">游泳</Select.Option>
                    <Select.Option value="1">打篮球</Select.Option>
                    <Select.Option value="2">踢足球</Select.Option>
                    <Select.Option value="3">骑行</Select.Option>
                    <Select.Option value="4">爬山</Select.Option>
                    <Select.Option value="5">台球</Select.Option>
                    <Select.Option value="6">游戏</Select.Option>
                    <Select.Option value="7">唱K</Select.Option>
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item label="是否已婚:">
              {
                getFieldDecorator('married', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Switch />
                )
              }
            </Form.Item>
            <Form.Item label="生日:">
              {
                getFieldDecorator('birthday', {
                  initialValue: moment(new Date())
                })(
                  <DatePicker placeholder="请选择生日" />
                )
              }
            </Form.Item>
            <Form.Item label="联系地址:">
              {
                getFieldDecorator('address', {
                  initialValue: '北京市海淀区奥林匹克公园'
                })(
                  <Input.TextArea rows={2} />
                )
              }
            </Form.Item>

            <Form.Item label="早起时间:">
              {
                getFieldDecorator('startTime', {
                  initialValue: moment('2018-09-12 08:00:00')
                })(
                  <TimePicker
                    placeholder="请选择"
                  />
                )
              }
            </Form.Item>

            <Form.Item label="头像:">
              {
                getFieldDecorator('avatar', {
                  rules: [{
                    required: true,
                    message: '请上传头像'
                  }]
                })(
                  <Upload
                    action="//jsonplaceholder.typicode.com/posts/"
                    listType="picture-card"
                    className="avatar-uploader"
                  >
                    <Icon type='plus' />
                  </Upload>
                )
              }
            </Form.Item>
            <Form.Item
              wrapperCol={{ offset: 4 }}
            >
              {
                getFieldDecorator('agree', {
                  valuePropName: 'checked',
                  initialValue: true
                })(
                  <Checkbox>我已阅读过<a href="/admin/form/register">慕课协议</a></Checkbox>
                )
              }
            </Form.Item>

            <Form.Item
              wrapperCol={{ offset: 4 }}
            >
              <Button type="primary" htmlType="submit">登陆</Button>
            </Form.Item>

          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create({ name: 'register' })(FormRegister);