import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "",
    redirect: "/microMain/login"
  },
  {
    path: "/microMain/login",
    name: 'login',
    component: () => import("@/pages/login.vue")
  },
  {
    path: "/microMain",
    children: [
      {
        path: "home",
        name: 'home',
        component: () => import("@/pages/home.vue"),
        children: [
          {
            path: "/microMain/setting",
            name: 'setting',
            component: () => import("@/pages/setting.vue")
          },
          {
            path: "/microMain/about",
            name: 'about',
            component: () => import("@/pages/about.vue")
          },
          {
            path: "/module/*",
            name: 'module',
            component: () => import("@/pages/module.vue")
          }
        ]
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  base: "/microMain", // window.__POWERED_BY_QIANKUN__ ? '/microMain' : '/',
  routes
})

export {
  routes,
  router
}