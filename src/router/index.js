import { createRouter, createWebHistory } from "vue-router"

const base = process.env.VUE_APP_BASE_URL;

const routes = [
  {
    path: "/",
    redirect: base + "/login"
  },
  {
    path: base,
    redirect: base + "/login"
  },
  {
    path: base + "/login",
    name: 'login',
    component: () => import("@/pages/login.vue")
  },
  {
    path: base + "/home",
    name: '主应用首页',
    menuPath: base + "/home",
    component: () => import("@/pages/layout.vue"),
    children: [
      {
        path: base + "/setting",
        name: '主应用设置',
        menuPath: base + "/setting",
        component: () => import("@/pages/setting.vue")
      },
      {
        path: base + "/about",
        name: '主应用关于',
        menuPath: base + "/about",
        component: () => import("@/pages/about.vue")
      },
    ]
  },
  {
    path: '/microChild/:pathMatch(.*)',
    name: '子应用的渲染页面',
    component: () => import('@/pages/layout.vue'),
  },
  {
    path: '/microUserCenter/:pathMatch(.*)',
    name: '用户中心渲染页面',
    component: () => import('@/pages/layout.vue'),
  },
  {
    path: '/microBi/:pathMatch(.*)',
    name: 'bi渲染页面',
    component: () => import('@/pages/layout.vue'),
  },
  {
    path: '/microEmbpVweb/:pathMatch(.*)',
    name: 'embpVweb渲染页面',
    component: () => import('@/pages/layout.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  base,
  routes
})

export {
  routes,
  router
}