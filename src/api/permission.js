import { permission } from '../config/apiUrlConfig';
import Axios from '../axios/axios';

//获取角色列表数据
export const getRoleList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: permission.roleList,
    params
  })
}

//添加角色
export const addRole = (data) => {
  return Axios.ajax({
    method: 'post',
    url: permission.addRole,
    data
  })
}

//设置角色权限
export const setPermission = (data) => {
  return Axios.ajax({
    method: 'post',
    url: permission.setPermission,
    data
  })
}

//获取用户列表数据
export const getUserList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: permission.userList,
    params
  })
}

//设置用户角色
export const setUserRole = (data) => {
  return Axios.ajax({
    method: 'post',
    url: permission.userRoleEdit,
    data
  })
}