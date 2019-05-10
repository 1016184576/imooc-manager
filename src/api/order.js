import { order } from '../config/apiUrlConfig';
import Axios from '../axios/axios';

//获取订单列表数据
export const getOrderList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: order.orderList,
    params
  })
}