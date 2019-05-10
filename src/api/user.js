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

