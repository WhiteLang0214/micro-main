
import envConfig from './config.json'// 配置子应用访问地址
const ENV = process.env.NODE_ENV || 'development'// 使用 NODE_ENV 区分不同环境，默认值为 development
const config = envConfig[ENV]
// const { MICRO_Bi, MICRO_EMBP_VWEB, MICRO_USER_CENTER } = config
const { MICRO_CHILD, MICRO_ANGULAR } = config;
import store from "@/store"
const microAppConfig = [
  {
    name: 'microChild', // 唯一性，可用微应用的名称
    entry: MICRO_CHILD, // 
    container: '#microContainer', // 微应用挂在的dom
    activeRule: '/microChild', // 触发匹配微应用的路由规则
    props: { // 提供给子应用的数据
      store, // 将主应用的store实例传给子应用
    }
  },
  // {
  //   name: 'microUserCenter', // 用户中心
  //   entry: MICRO_USER_CENTER,
  //   container: '#microContainer',
  //   activeRule: '/microUserCenter',
  //   props: {
  //     store,
  //     echarts: window.echarts
  //   }
  // },
  // {
  //   name: 'microBi', // bi
  //   entry: MICRO_Bi,
  //   container: '#microContainer',
  //   activeRule: '/microBi',
  //   props: {
  //     store,
  //     echarts: window.echarts
  //   }
  // },
  // {
  //   name: 'microEmbpVweb', // embpVweb 单独的项目
  //   entry: MICRO_EMBP_VWEB, // 
  //   container: '#microContainer',
  //   activeRule: '/microEmbpVweb',
  //   props: {
  //     store,
  //     echarts: window.echarts
  //   }
  // },
  {
    name: 'microAngular', // embpWeb 老异常 angular
    entry: MICRO_ANGULAR,
    container: '#microContainer',
    activeRule: '/microAngular',
    props: {
      store,
      echarts: window.echarts
    }
  }
];

export default microAppConfig;