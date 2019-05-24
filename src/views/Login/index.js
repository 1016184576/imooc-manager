import React from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { login } from '../../api/user' ;
import "./index.less";

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, userInfo) => {
      if (!err) {
        login(userInfo).then(({ data }) => {
          if(data){
            console.log(this.props.location.state.from.pathname)
            localStorage.setItem('user',JSON.stringify(userInfo))
            this.props.history.push({
              pathname: this.props.location.state.from.pathname || '/home'
            })
          }
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login-warp">
        <div className="header">
          <img src="/assets/logo-ant.svg" alt="" />
          <span>共享单车后台管理系统</span>
        </div>
        <div className="login-content">
          <div className="word">
            共享出行 <br />
            引领城市新经济
          </div>
          <div className="login-box">
            <h2>上海欢迎您</h2>
            <Form 
              onSubmit={this.handleSubmit} 
              className="login-form"
            >
              <Form.Item>
                {
                  getFieldDecorator('username', {
                    rules: [{ 
                      required: true, 
                      message: '请输入用户名!' 
                    }],
                    initialValue:'Admin'
                  })(
                    <Input
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="请输入用户名"
                    />,
                  )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ 
                    required: true, 
                    message: '请输入密码!' 
                  }],
                  initialValue:'123456'
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
              <Form.Item
              >
                {
                  getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(<Checkbox>记住密码</Checkbox>)
                }
                <a className="login-form-forgot" href="javascript:void(0);">
                  忘记密码
                </a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  登陆
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div className="footer">
          版权所有：正完美先森（推荐使用谷歌浏览器，可以获得更佳操作页面体验） 技术支持：正完美先森
        </div>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(Login);