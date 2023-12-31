import { createRouter, createWebHistory } from "vue-router"

const base = process.env.VUE_APP_BASE_URL;
const homeMenuId = process.env.VUE_APP_HOME_MENU_ID;

const homePath = {
  path: base + "/home",
  name: "首页",
  id: homeMenuId,
  menuPath: base + "/home",
  microFullPath: base + "/home",
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
  {
    path: '/microAngular/:pathMatch(.*)',
    name: 'embpWebAngular渲染页面',
    component: () => import('@/pages/layout.vue'),
  },
  {
    path: '/microEmbpWeb/:pathMatch(.*)',
    name: '老异常angular渲染页面',
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