export default {
  state: {
    oldSysLoginInfo: "{}",
  },
  mutations: {
    // 保存老异常系统的登陆信息
    SAVE_oldSys_LOGIN_INFO(state, val) {
      console.log(111, state)
      state.oldSysLoginInfo = val;
    },
  },
  getters: {
    // 获取老异常系统登录用户信息
    getOldSysLoginInfo(state) {
      return state.oldSysLoginInfo
    },
  }
}