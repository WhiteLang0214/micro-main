export const state = {
  loginInfo: "{}",
  currentActiveMenu: "", // 当前激活路由 存储数据格式，JSON.stringify({})
  activeRouteMatched: [], // 激活路由栈的记录
  routerViewLoading: false // 路由区域的loading状态 进入微应用前 true 进入微应用后 false
}