import { createRouter, createWebHistory } from "vue-router"

const base = process.env.VUE_APP_BASE_URL;

const homePath = {
  path: base+ "/home",
  name: "首页",
  id: "M0001",
  menuPath: base + "/home",
  currentActivePath: "/microMain/home",
  component: () => import("@/pages/home.vue")
}

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
    path: base,
    name: '布局',
    component: () => import("@/pages/layout.vue"),
    children: [homePath]
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

router.beforeEach(to => {
  if (to.name === "login") {
    sessionStorage.setItem("microMain_login_info", null)
    sessionStorage.clear()
  }
})

export {
  routes,
  router,
  homePath
}