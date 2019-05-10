import { table } from '../config/apiUrlConfig';
import Axios from '../axios/axios';

//获取基础列表数据
export const getBasicList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: table.basicList,
    params
  })
}

//获取高级表格中固定头部列表数据
export const getFixedHeaderData = (params) => {
  return Axios.ajax({
    method: 'get',
    url: table.fixedHeaderList,
    params
  })
}

//获取高级表格中固定列列表数据
export const getFixedColumnData = (params) => {
  return Axios.ajax({
    method: 'get',
    url: table.fixedColumnList,
    params
  })
}


