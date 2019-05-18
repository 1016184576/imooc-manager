import { bikeMap } from '../config/apiUrlConfig';
import Axios from '../axios/axios';

//获取单车列表数据
export const getBikeList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: bikeMap.bikeList,
    params
  })
}
