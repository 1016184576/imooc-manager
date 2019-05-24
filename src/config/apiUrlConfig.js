export const city = {
  openCityList: '/open_city_list',  //开通城市列表
}

export const order = {
  orderList: '/order_list'    //订单列表
}

export const table = {
  basicList: '/table/basic/getList',   //基础表格数据
  fixedHeaderList: '/table/high/getFixedHeaderList',  //固定头部表格数据
  fixedColumnList: '/table/high/getFixedColumnList',  //固定头部表格数据
}

export const user = {
  employeeList: '/employee/getList',    //获取员工列表
  editEmployee: '/employee/editEmployee',    //编辑修改员工信息
  addEmployee: '/employee/addEmployee',    //新增员工信息
  login: '/login'   //用户登陆
}

export const bikeMap = {
  bikeList: '/bike_list'    //获取单车数据
}

export const permission = {
  roleList: '/role/role_list',    //获取角色列表数据
  addRole: '/role/addRole',    //添加角色
  setPermission: '/role/setPermission',   //设置角色权限,
  userList: '/role/user_List',   //获取用户列表数据
  userRoleEdit: '/role/user_role_edit',   //设置用户角色
}
