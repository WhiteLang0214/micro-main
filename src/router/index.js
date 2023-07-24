import { createRouter, createWebHistory } from "vue-router"

const base = process.env.VUE_APP_BASE_URL;

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("@/pages/login.vue")
  },
  {
    path: "/home",
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
    path: '/portal/*',
    name: 'portal',
    component: () => import('@/pages/portal.vue'),
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