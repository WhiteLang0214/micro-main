export const mutations = {
  SAVE_TOKEN(state, val) {
    state.token = val;
  },
  SAVE_LOGIN_INFO(state, val) {
    state.loginInfo = val;
  },
  SAVE_CURRENTACTIVEMENU(state, val) {
    state.currentActiveMenu = val
  }
}