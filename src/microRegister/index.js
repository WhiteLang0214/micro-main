

import envConfig from './config.json'// 配置子应用访问地址
const ENV = process.env.NODE_ENV || 'development'// 使用 NODE_ENV 区分不同环境，默认值为 development
const config = envConfig[ENV]
const { MICRO_BIBP_VWEB } = config

console.log("MICRO_BIBP_VWEB-----" , MICRO_BIBP_VWEB);

const microAppConfig = [
  {
    name: 'microChild', // 唯一性，可用微应用的名称
    entry: "//localhost:8082", // 
    container: '#microContainer', // 微应用挂在的dom
    activeRule: '/portal/microChild', // 触发匹配微应用的路由规则
    props: { // 提供给子应用的数据
      routerBase: "/microChild", // 子应用路由的base
      getGlobalState: "", // 提供子应用获取公共数据
      routerList: [], // 提供给子应用的路由列表
    }
  },
];

export default microAppConfig;