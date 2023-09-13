export const getters = {
  // 获取登录用户信息
  getLoginInfo(state) {
    return state.loginInfo
  },
  // 获取当前激活路由
  getActiveMenu(state) {
    return state.currentActiveMenu
  },
  // 获取激活路由栈
  getActiveRouteMatched(state) {
    return state.activeRouteMatched;
  },
  // 微应用加载loading动画
  getRouterViewLoading(state) {
    return state.routerViewLoading;
  }
}