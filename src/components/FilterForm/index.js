import React from 'react';
import { Form, Button, DatePicker, Select, Input, Checkbox } from "antd";
import Utils from '../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

class FilterForm extends React.Component {

  handleSubmit = () => {
    const fieldsValues = this.props.form.getFieldsValue();
    this.props.handleSubmit(fieldsValues);
  }

  getInitList = () => {
    let formList = this.props.formList;
    let formItem = [];
    if (formList && formList.length > 1) {
      const { getFieldDecorator } = this.props.form;
      formList.forEach(item => {
        const { type, label, width, placeholder, list, field, initialValue } = item;
        if (type === 'SELECT') {
          const SELECT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                initialValue: initialValue
              })(
                <Select style={{ width: width }}>
                  <Option value="0" key="all_key">全部</Option>
                  {
                    Utils.getOptionList(list)
                  }
                </Select>
              )
            }
          </FormItem>;
          formItem.push(SELECT);
        } else if (type === 'INPUT') {
          const INPUT = <FormItem label={label} key={field}>
            {
              getFieldDecorator(field, {
                initialValue: initialValue
              })(
                <Input placeholder={placeholder} style={{ width: width }} />
              )
            }
          </FormItem>;
          formItem.push(INPUT);
        } else if (type === 'CHECKBOX') {
          const CHECKBOX = <FormItem key={field}>
            {
              getFieldDecorator(field, {
                valuePropName: 'checked',
                initialValue: initialValue //true || false
              })(
                <Checkbox>{label}</Checkbox>
              )
            }
          </FormItem>;
          formItem.push(CHECKBOX);
        } else if (type === 'TIME') {
          const START_TIME = <FormItem label='开始时间' key='start_time'>
            {
              getFieldDecorator('start_time')(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder} style={{ width: width }} />
              )
            }
          </FormItem>;
          formItem.push(START_TIME);
          const END_TIME = <FormItem label='~' colon={false} key="end_time">
            {
              getFieldDecorator('end_time')(
                <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" placeholder={placeholder} style={{ width: width }} />
              )
            }
          </FormItem>;
          formItem.push(END_TIME);
        }
      })
    }
    return formItem;
  }
  render() {
    return (
      <Form layout="inline">
        {this.getInitList()}
        <FormItem>
          <Button type="primary" onClick={this.handleSubmit}>查询</Button>
        </FormItem>
        {
          this.props.hideReset ? '' :
            <FormItem>
              <Button onClick={() => {
                this.props.form.resetFields();
              }}>重置</Button>
            </FormItem>
        }
      </Form>
    )
  }
}

export default Form.create({})(FilterForm);