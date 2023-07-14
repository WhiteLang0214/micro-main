import { createApp } from 'vue'
import App from './App.vue'
import {
  createRouter, 
  createWebHistory
} from 'vue-router';

/***************************/
import microApp from "./microRegister"
import { registerMicroApps, start } from 'qiankun';
registerMicroApps(microApp); //注册子应用
start(); //启动qiankun
/***************************/

const router = createRouter({
  history: createWebHistory(),
  base: window.__POWERED_BY_QIANKUN__ ? '/microMain' : '/',
  routes: [
    {
      path: "/microMain",
      name: 'microMain',
      component: () => import("./pages/home.vue")
    }
  ]
})

createApp(App).use(router).mount('#app')
