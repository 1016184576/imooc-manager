import { user } from '../config/apiUrlConfig';
import Axios from '../axios/axios';

//获取员工管理列表数据
export const getEmployeeList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: user.employeeList,
    params
  })
}


//编辑修改员工信息
export const editEmployee = (data) => {
  return Axios.ajax({
    method: 'post',
    url: user.editEmployee,
    data
  })
}

//新增员工信息
export const addEmployee = (data) => {
  return Axios.ajax({
    method: 'post',
    url: user.addEmployee,
    data
  })
}

//用户登陆
export const login = (params) => {
  return Axios.ajax({
    method: 'get',
    url: user.login,
    params
  })
}

