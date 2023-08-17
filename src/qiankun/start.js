import { start } from "qiankun";

export default function () {
  start({
    sandbox: {
      experimentalStyleIsolation: true
    },
    async fetch(url, ...args) {
      if (url === "http://local.leandc.cn:8083/echarts.min.js") {
        return {
          async text() {
            return ""
          }
        }
      }
      return window.fetch(url, ...args);
    },
  }); //启动qiankun
}