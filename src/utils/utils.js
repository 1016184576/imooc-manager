import React from 'react';
import { Select } from "antd";
const Option = Select.Option;
export default {
  formatDate( time, fmt) {
    if(!time) return '';
    if(!fmt) fmt = "yyyy-MM-dd hh:mm:ss";
    let date = new Date(time)
    var o = {
      "M+": date.getMonth() + 1,                 //月份   
      "d+": date.getDate(),                    //日   
      "h+": date.getHours(),                   //小时   
      "m+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
  pagination(data,callback){
    return {
      current: data.current,
      pageSize: data.pageSize,
      total: data.total,
      showQuickJumper:true,
      onChange(page, pageSize){
        callback(page, pageSize);
      },
      showTotal(total){
        return `共${total}条`
      }
    }
  },
  getOptionList(data){
    if(!data || data.length === 0)return [];
    let optionList = [];
    data.map((item)=>{
      optionList.push(<Option key={item.id} value={item.id}>{item.text}</Option>)
      return item;
    })
    return optionList;
  }
}