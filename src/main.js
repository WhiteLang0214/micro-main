import { createApp } from 'vue'
import App from './App.vue'
import {
  createRouter, 
  createWebHistory
} from 'vue-router';
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/reset.css";

/***************************/
import microApp from "./microRegister"
import { registerMicroApps, start } from 'qiankun';
registerMicroApps(microApp); //注册子应用
start(); //启动qiankun
/***************************/

const router = createRouter({
  history: createWebHistory(),
  base: "/microMain", // window.__POWERED_BY_QIANKUN__ ? '/microMain' : '/',
  routes: [
    {
      path: "/microMain",
      children: [
        {
          path: "setting",
          name: 'setting',
          component: () => import("./pages/setting.vue")
        },
        {
          path: "about",
          name: 'about',
          component: () => import("./pages/about.vue")
        }
      ]
    }
  ]
})

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(ElementPlus).mount('#app')
