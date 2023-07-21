import store from "./store";
/***************************/
import microApp from "./microRegister"
import { registerMicroApps, start, initGlobalState, addGlobalUncaughtErrorHandler } from 'qiankun';
registerMicroApps(microApp, {
  beforeLoad: (app) => {
    console.log("qiankun 微应用加载前----", app)
    return Promise.resolve();
  },
  afterMount: (app) => {
    console.log("qiankun微应用挂载后----", app)
    return Promise.resolve();
  }
}); //注册子应用


addGlobalUncaughtErrorHandler(() => {
  console.log("加载失败--=------")
})

start({
  sandbox: {
    experimentalStyleIsolation: true
  }
}); //启动qiankun

// 初始化state
const actions = initGlobalState(store);
actions.onGlobalStateChange((state, prev) => {
  // state:变更后状态 prev:变更前状态
  console.log("主应用------", state, prev)
});
setTimeout(() => {
  actions.setGlobalState(store);
}, 1000)
actions.offGlobalStateChange();
/***************************/