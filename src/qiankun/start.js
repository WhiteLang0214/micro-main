import { start } from "qiankun";

export default function () {
  start({
    sandbox: {
      // strictStyleIsolation: true, // 开启严格的样式隔离模式 这样子应用会找不到dom
      experimentalStyleIsolation: true
    },
    // async fetch(url, ...args) {
    //   if (url === "http://local.leandc.cn:8083/echarts.min.js") {
    //     return {
    //       async text() {
    //         return ""
    //       }
    //     }
    //   }
    //   return window.fetch(url, ...args);
    // },
  }); //启动qiankun
}