import { start } from "qiankun";
import envConfig from '../microRegister/config.json'// 配置子应用访问地址
const ENV = process.env.NODE_ENV || 'development'// 使用 NODE_ENV 区分不同环境，默认值为 development
const config = envConfig[ENV];

const jsConfig = [
  config["MICRO_USER_CENTER"] + "/echarts.min.js",
  config["MICRO_EMBP_VWEB"] + "/echarts.min.js"
]

export default function () {
  start({
    sandbox: {
      // strictStyleIsolation: true, // 开启严格的样式隔离模式 这样子应用会找不到dom
      experimentalStyleIsolation: true
    },
    async fetch(url, ...args) {
      if (jsConfig.includes(url)) {
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