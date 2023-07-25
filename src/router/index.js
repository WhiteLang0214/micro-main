import { createRouter, createWebHistory } from "vue-router"

const base = process.env.VUE_APP_BASE_URL;

const routes = [
  {
    path: "/",
    redirect: base + "/login"
  },
  {
    path: base + "/login",
    name: 'login',
    component: () => import("@/pages/login.vue")
  },
  {
    path: base + "/home",
    name: 'home',
    component: () => import("@/pages/layout.vue"),
    children: [
      {
        path: base + "/setting",
        name: 'setting',
        component: () => import("@/pages/setting.vue")
      },
      {
        path: base + "/about",
        name: 'about',
        component: () => import("@/pages/about.vue")
      },
    ]
  },
  {
    path: '/microChild/:pathMatch(.*)',
    name: '子应用的渲染页面',
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