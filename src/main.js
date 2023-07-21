import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "./assets/reset.css";
import { router } from "./router";
import store from "./store";
import "./startQiankun";

const app = createApp(App);
// 注册element-icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(router).use(store).use(ElementPlus).mount('#app')



