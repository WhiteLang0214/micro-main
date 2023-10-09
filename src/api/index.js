import { post, get } from "@/axios";

// uc登录
export const ucLogin = data => post(`/uc/login/pwd`, data);
// uc登录 获取菜单
export const ucMenuPc = data => post(`/uc/authority/userMenu?menuType=${data?.menuType || 1}`, data);
// 获取头像
export const loginAccountInfo = data => get(`/uc/loginAccount/loginAccountInfo`, data)
// 退出系统
export const logout = data => get("/uc/login/logout", data);
// 修改头像
export const uploadHeader = data => post(`/uc/loginAccount/headSculpture`, data);
// 获取头像
export const getHeaderId = data => get(`/uc/loginAccount/loginAccountInfo`, data)
// 单个文件上传(只上传图片)
export const uploadPhoto = (data, option) => post(`/uc/basDoc/uploadPhoto`, data, option);
// 老异常的登陆
export const oldLogin = (data) => post(`/bas/user/login`, data);
// 老异常获取菜单
export const oldMenu = () => get(`/bas/menu?params=`);