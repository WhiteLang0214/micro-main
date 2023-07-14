

import envConfig from './config.json'// 配置子应用访问地址
const ENV = process.env.NODE_ENV || 'development'// 使用 NODE_ENV 区分不同环境，默认值为 development
const config = envConfig[ENV]
const { MICRO_BIBP_VWEB } = config

// const getActiveRule = hash => location => location.hash.startsWith(hash)

const microAppConfig = [
  {
    name: 'microChild', // 唯一性，可用微应用的名称
    entry: MICRO_BIBP_VWEB, // 
    container: '#microContainer', // 微应用挂在的dom
    activeRule: '/microChild', // 触发匹配微应用的路由规则
  }
];

export default microAppConfig;