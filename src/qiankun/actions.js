import { state } from "@/store/state";
import {  initGlobalState } from 'qiankun';

// 监听全局数据变化
function globalStateChange(state, prev) {
  console.log("监听全局数据变化---",state, prev)
}

// 初始化state
const actions = initGlobalState(state);
actions.onGlobalStateChange((state, prev) => globalStateChange(state, prev), true);
actions.offGlobalStateChange();

export default actions;