import { get, post } from "@/axios";

// export const olgLogin = data => post("/bas/user/login", data)

// export const newLogin = data => post(`/serve/doLogin?name=${data.name}&pwd=${data.pwd}`, data)

// // 获取首页的菜单，配置动态路由及生成菜单使用
// export const getMenu = data => post("/authority/userMenu?menuType=1", data);

// // 获取用户信息
// export const getHeaderId = data => get(`/loginAccount/loginAccountInfo`, data)

// uc登录
export const ucLogin = data => post(`/uc/login/pwd`, data);
// uc登录 bas获取菜单
export const basMenuPc = () => get(`/bas/menu/pc`);