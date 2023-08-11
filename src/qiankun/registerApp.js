import microApp from "@/microRegister"
import { 
  registerMicroApps, 
  addGlobalUncaughtErrorHandler, 
  removeGlobalUncaughtErrorHandler} from 'qiankun';

registerMicroApps(microApp, {
  beforeLoad: (app) => {
    console.log("qiankun 微应用加载前----", app)
    return Promise.resolve();
  },
  afterMount: (app) => {
    console.log("qiankun微应用挂载后----", app)
    return Promise.resolve();
  }
}); 

// 全局的未捕获异常处理器
addGlobalUncaughtErrorHandler((event) => {
  console.log("全局异常捕获加载失败--=------", event)
})

// 移除全局未捕获异常处理器
removeGlobalUncaughtErrorHandler(handler);

function handler() { }