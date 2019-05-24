import React from 'react';
import { Card, Form, Button, Select, Table, Modal, Input, Message, Tree, Transfer } from "antd";
import { roleNameConfig } from '../../config/fieldRenderConfig';
import { getRoleList, addRole, setPermission, getUserList, setUserRole } from '../../api/permission'
import menuList from '../../config/menuConfig';
import Utils from '../../utils/utils'
import "./index.less";

const { Option } = Select;
const { TreeNode } = Tree;

class Permission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRow: {},
      pagination: {},
      visible1: false,
      visible2: false,
      visible3: false,
    }
  }

  componentWillMount() {
    this.loadRoleList();
  }

  locale = { 
    searchPlaceholder: '请输入用户名', 
    notFoundContent: '列表为空', 
    itemUnit: '项', 
    itemsUnit: '项' 
  }
  params = {
    page: 1,
    pageSize: 10
  }

  onRow = (record) => {
    return {
      // 点击行
      onClick: (event) => {
        this.setState({
          selectedRowKeys: [record.id],
          selectedRow: record,
          menuInfo: record.menus
        })
      }
    }
  }


  //创建角色
  addRoleHandle = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addRole(values).then(res => {
          if (res.data) {
            this.setState({
              visible1: false
            })
            this.loadRoleList();
            Message.success('添加成功！')
          }
        })
      }
    })
  }

  //设置权限按钮事件
  setPermissionHandle = () => {
    this.commonHandle(() => {
      this.setState({
        visible2: true
      })
    })
  }

  //提交设置权限
  setPermissionSubmit = () => {
    console.log(this.props.form.getFieldsValue())
    let formValue = this.props.form.getFieldsValue();
    setPermission(Object.assign(formValue, { menus: this.state.menuInfo })).then(res => {
      if (res.data) {
        this.setState({
          visible2: false,
          selectedRowKeys: [],
          selectedRow: {},
          menuInfo: []
        })
        Message.success('修改成功！')
      }
    })
  }

  //用户授权
  userAuthHandle = () => {
    this.commonHandle(() => {
      getUserList({
        id: this.state.selectedRow.id
      }).then(res => {
        const targetKeys = [];
        const transferData = [];
        res.data.list.forEach(item => {
          const data = {
            key: item.user_id.toString(),
            title: item.user_name,
            chosen: item.status,
          };
          if (data.chosen) {
            targetKeys.push(data.key);
          }
          transferData.push(data);
        })
        this.setState({
          transferData,
          targetKeys,
          visible3: true,
        })
      })

    })
  }

  //提交用户授权结果
  userAuthSubmit = () => {
    setUserRole({
      roleId: this.state.selectedRow.roleName,
      users: this.state.targetKeys.join(',')
    }).then(res => {
      if (res.data) {
        this.setState({
          visible3: false,
          selectedRowKeys: [],
          selectedRow: {},
        })
        this.loadRoleList();
        Message.success('授权成功！')
      }
    })
  }

  //需要做选中判断的公用方法
  commonHandle = callback => {
    if (JSON.stringify(this.state.selectedRow) !== '{}') {
      if (callback) callback();
    } else {
      Modal.info({
        title: "温馨提示",
        content: "请先选择角色",
        cancelText: '',
        okText: '关闭',
        width: 320
      })
    }
  }

  //加载角色列表
  loadRoleList = () => {
    getRoleList({
      params: this.params
    }).then(res => {
      this.setState({
        dataSource: res.data.list,
        pagination: Utils.pagination(res.data, (page, pageSize) => {
          this.params = {
            page,
            pageSize
          }
          this.loadRoleList()
        })
      })
    })
  }

  renderTreeNodes = (data) =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    })

  onCheck = checkedKeys => {
    this.setState({
      menuInfo: checkedKeys
    })
  }

  transferChangehandle = (targetKeys) => {
    this.setState({
      targetKeys: targetKeys
    })
  }

  render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id',
        align: 'center'
      }, {
        title: '角色名称',
        dataIndex: 'roleName',
        align: 'center',
        render(roleName) {
          return roleNameConfig[roleName];
        }
      }, {
        title: '使用状态',
        dataIndex: 'status',
        align: 'center',
        render(status) {
          return status === 0 ? '停用' : '开启';
        }
      }, {
        title: '创建时间',
        dataIndex: 'createTime',
        align: 'center'
      }, {
        title: '授权时间',
        dataIndex: 'authTime',
        align: 'center'
      }, {
        title: '授权人',
        dataIndex: 'authPeople',
        align: 'center'
      }];

    let rowSelection = {
      selectedRowKeys: this.state.selectedRowKeys,
      type: 'radio'
    };

    const labelCol = { xs: 24, sm: 5 },
      wrapperCol = { xs: 24, sm: 16 };
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="permission-warp">
        <Card>
          <Button type="primary" className="button" onClick={() => {
            this.setState({
              visible1: true
            })
          }}>
            创建角色
          </Button>
          <Button type="primary" className="button" onClick={this.setPermissionHandle}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.userAuthHandle}>
            用户授权
          </Button>
        </Card>
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
          title="创建角色"
          visible={this.state.visible1}
          onOk={this.addRoleHandle}
          onCancel={() => {
            this.setState({
              visible1: false
            })
          }}
        >
          <Form
            layout="horizontal"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Form.Item label="角色名称:">
              {
                getFieldDecorator('roleName', {
                  rules: [{
                    required: true,
                    message: '请输入角色名称!'
                  }]
                })(
                  <Input placeholder="请输入角色名称" />
                )
              }
            </Form.Item>
            <Form.Item label="状态:">
              {
                getFieldDecorator('status', {
                  initialValue: 1
                })(
                  <Select>
                    <Option value={1} key="1">开启</Option>
                    <Option value={0} key="0">停用</Option>
                  </Select>
                )
              }
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title="设置权限"
          visible={this.state.visible2}
          onOk={this.setPermissionSubmit}
          width={600}
          onCancel={() => {
            this.setState({
              visible2: false
            })
          }}
        >
          <Form
            layout="horizontal"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Form.Item label="角色名称:">
              {
                getFieldDecorator('roleName', {
                  initialValue: roleNameConfig[this.state.selectedRow.roleName]
                })(
                  <Input placeholder="请输入角色名称" disabled={true} />
                )
              }
            </Form.Item>
            <Form.Item label="状态:">
              {
                getFieldDecorator('status', {
                  initialValue: this.state.selectedRow.status
                })(
                  <Select style={{ width: 100 }}>
                    <Option value={1} key="1">开启</Option>
                    <Option value={0} key="0">停用</Option>
                  </Select>
                )
              }
            </Form.Item>
          </Form>
          <Tree
            checkable
            autoExpandParent={true}
            defaultExpandAll={true}
            onCheck={this.onCheck}
            checkedKeys={this.state.menuInfo}
          >
            <TreeNode title='平台权限' key='platform_all'>
              {this.renderTreeNodes(menuList)}
            </TreeNode>
          </Tree>
        </Modal>

        <Modal
          title="用户授权"
          width={800}
          visible={this.state.visible3}
          onOk={this.userAuthSubmit}
          onCancel={() => {
            this.setState({
              visible3: false
            })
          }}
        >
          <Form
            layout="horizontal"
            labelCol={labelCol}
            wrapperCol={wrapperCol}
          >
            <Form.Item label="角色名称:">
              {
                getFieldDecorator('roleName', {
                  initialValue: roleNameConfig[this.state.selectedRow.roleName]
                })(
                  <Input placeholder="请输入角色名称" disabled={true} />
                )
              }
            </Form.Item>
            <Form.Item label="选择用户:">
              <Transfer
                dataSource={this.state.transferData}
                showSearch
                listStyle={{width:200,height:400}}
                locale={this.locale}
                titles={["待选用户", "已选用户"]}
                targetKeys={this.state.targetKeys}
                onChange={this.transferChangehandle}
                render={item => item.title}
              />
            </Form.Item>
          </Form>

        </Modal>
      </div>
    )
  }
}


export default Form.create({ name: 'permission' })(Permission);