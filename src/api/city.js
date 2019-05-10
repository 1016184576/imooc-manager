import { city } from '../config/apiUrlConfig';
import Axios from '../axios/axios';

//获取开通城市列表数据
export const getCityList = (params) => {
  return Axios.ajax({
    method: 'get',
    url: city.openCityList,
    params
  })
}