
import axios from "axios"
import { msgFun } from "@/utils/message";

const HOST = process.env.VUE_APP_HOST;

const instance = axios.create();
instance.defaults.baseURL = HOST;
instance.defaults.timeout = 200000;
instance.defaults.headers.common['Authorization'] = getAuth();
instance.defaults.headers.post['Content-Type'] = 'application/json';

function getAuth() {
  return "token"
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  console.log("请求拦截器---", config)
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  if (response.status != 200) {
    msgFun("error", "服务端请求失败")
    return Promise.reject(response);
  } else {
    if (response.data && response.data.err == 0) {
      return Promise.resolve(response.data)
    } else {
      msgFun("error", response.data.errMsg)
      return Promise.reject(response);
    }
  }
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  msgFun("error", "服务端请求失败")
  return Promise.reject(error);
});

function get(url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, params).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

function post(url, data, config) {
  return new Promise((resolve, reject) => {
    instance.post(url, data, config).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export default instance

export {
  get,
  post
}