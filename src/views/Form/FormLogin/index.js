import React from 'react';
import { Card, Form, Button, Input, Checkbox, Icon, Message } from "antd";
import "./index.less";



class FormLogin extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    
    }
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values)=>{
      if(!err){
        console.log(values)
        Message.success(`用户${values.userName}登陆成功`)
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="form-login-warp">
        <Card title="登录行内表单" className="card">
          <Form layout="inline">
            <Form.Item>
              <Input type="text" placeholder="请输入用户名"/>
            </Form.Item>
            <Form.Item>
              <Input type="password" placeholder="请输入密码"/>
            </Form.Item>
            <Form.Item>
              <Button type="primary">登陆</Button>
            </Form.Item>
          </Form>
        </Card>
        <Card title="登录水平表单" className="card">
          <Form style={{width:300}} onSubmit={this.handleSubmit}>
            <Form.Item>
              {
                getFieldDecorator('userName',{
                  rules:[{ 
                    required: true, 
                    message: '请输入用户名!' 
                  }]
                })(
                  <Input prefix={<Icon type="user" />} type="text" placeholder="请输入用户名"/>
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules:[{ 
                    required: true, 
                    message: '请输入密码!' 
                  },{ 
                    max: 16, 
                    message: '密码长度不能超过16位!' 
                  },{ 
                    min: 6, 
                    message: '密码长度不能小于6位!' 
                  }]
                })(
                  <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码"/>
                )
              }
              
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('remember',{
                  valuePropName: 'checked',
                  initialValue:true
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="#" style={{float:'right'}}>忘记密码</a>
            </Form.Item>
            <Form.Item>
              <Button type="primary"  htmlType="submit" style={{width:'100%'}}>登陆</Button>
            </Form.Item>

          </Form>
        </Card>
      </div>
    )
  }
}

export default Form.create({ name: 'login' })(FormLogin);