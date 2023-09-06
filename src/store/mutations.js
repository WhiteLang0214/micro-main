export const mutations = {
  SAVE_LOGIN_INFO(state, val) {
    state.loginInfo = val;
  },
  SAVE_CURRENTACTIVEMENU(state, val) {
    if (val) {
      state.currentActiveMenu = val;
      this.commit("SAVE_ACTIVE_ROUTEMATCHED", val)
    }
  },
  // 存储激活路由栈的记录-存储当前激活路由
  SAVE_ACTIVE_ROUTEMATCHED(state, val) {
    // 查找路由记录里是否有当前激活的路由，如果没有则添加进路由栈记录
    const activeRouteMatched = state.activeRouteMatched;
    const currentActiveMenu = JSON.parse(val)
    const routeFindIndex = activeRouteMatched.findIndex(i => i.menuPath === currentActiveMenu.menuPath);
    if (routeFindIndex < 0 && currentActiveMenu) {
      // 如果当前激活路由是首页，则放在数组第一个
      if (currentActiveMenu.id && currentActiveMenu.id === "M0001") {
        state.activeRouteMatched.unshift(currentActiveMenu)
      } else {
        state.activeRouteMatched.push(currentActiveMenu)
      }
    }
  },
  // 存储的激活路由栈记录-删除当前关闭路由
  DELETE_ACTIVE_ROUTEMATCHED(state, val) {
    const activeRouteMatched = state.activeRouteMatched;
    state.activeRouteMatched = activeRouteMatched.filter(i => i.currentActivePath != val.currentActivePath)
  }
}