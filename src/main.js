import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import "@/assets/element.scss"; // 重设主题色
// import "@/assets/element.css"; // 重设主题色
// import { useCssVar } from "@vueuse/core"
// console.log("useCssVar", useCssVar)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/reset.css";
import "@/assets/rem";
import "./assets/svg";
import store from "./store";
import { router } from "./router";
// import 'zone.js/dist/zone';
import "@/qiankun/registerApp";
import coms from "@/components";

const app = createApp(App);
// 注册element-icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).use(coms).use(ElementPlus, {
  locale: zhCn
}).mount('#MainApp')



