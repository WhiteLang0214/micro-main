<template>
  <el-menu
    :default-active="defaultActive"
    :default-openeds="[defaultActive]"
    class="layout-menu"
    :collapse="isCollapse"
    unique-opened
    @open="handleOpen"
    @close="handleClose"
  >
  <div style="height: 45px;" @click="angularRoute">micro-angular</div>
  <div style="height: 45px;" @click="childRoute">micro-child</div>
  <div style="height: 45px;" @click="embpRoute">老异常wel/home页面</div>
    <template v-for="item in getMenuData" :key="item.id">
      <template v-if="item.children && item.children.length > 0">
        <el-sub-menu :index="item.id">
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item.name }}</span>
          </template>
          <MetaSubMenuItem :menuItemData="item" />
        </el-sub-menu>
      </template>
      <template v-else>
        <MetaMenuItem :menuItemData="item" :isCollapse="isCollapse" @toggleCollapse="toggleCollapse" />
      </template>
    </template>
  </el-menu>
</template>

<script lang="js" setup>

import { onMounted, ref, watch, computed } from 'vue'
import { useStore } from 'vuex'
import { ucMenuPc, oldMenu } from "@/api"
import { useRoute, useRouter } from 'vue-router'
import { homePath } from "@/router";

const store = useStore();
const route = useRoute();
const router = useRouter();
const isCollapse = ref(false);
const homeRoute = ref(homePath)

let menuData = ref([homeRoute]);
let oldMenuData = ref([]);
const VUE_APP_MICRO_UC = process.env.VUE_APP_MICRO_UC;
const VUE_APP_MICRO_BI = process.env.VUE_APP_MICRO_BI;
const VUE_APP_MICRO_EMBP = process.env.VUE_APP_MICRO_EMBP;
const VUE_APP_MICRO_ANGULAR = process.env.VUE_APP_MICRO_ANGULAR;

const handleOpen = () => {};
const handleClose = () => {};

const getMenuData = computed(() => [ ...menuData.value, ...oldMenuData.value ]);

// 创建用户中心菜单路由
const createRouterPath = ({ menuPath, id }) => {
  let routerPath = "";
  const ucPath = VUE_APP_MICRO_UC + menuPath;
  const biPath = VUE_APP_MICRO_BI + '/' + menuPath;
  const embpPath = VUE_APP_MICRO_EMBP + menuPath;

  if (id.indexOf("UC") > -1) { // 用户中心
    routerPath = ucPath;
  } else if (id.indexOf("bi") > -1 || id.indexOf("wkf") > -1 || id.indexOf("CI") > -1) {
    routerPath = biPath;
  } else if (id.indexOf("M0") > -1) {
    routerPath = embpPath;
  } else {
    routerPath = menuPath;
  } 
  return routerPath
}

// 获取用户中心菜单
const getMenu = () => {
  ucMenuPc(["UC200","UC100", "bi000", "CI000", "M02"]).then(res => {
    const { info } = res || {};
    handleMenu(info?.menus || [])
    menuData.value = menuData.value.concat(info?.menus || []);
    store.commit("SAVE_LOGIN_INFO", JSON.stringify(info))
    sessionStorage.setItem("microMain_login_info", JSON.stringify(info))
    defaultActiveCurrentRoute()
  }).catch(() => {})
}

// 格式化路由菜单
const handleMenu = (menu) => {
  menu.forEach((item) => {
    // 添加带有微应用baseUrl的完整路径
    const microFullPath = createRouterPath(item);
    item.microFullPath = microFullPath;
    if (item.children && item.children.length > 0) {
      handleMenu(item.children);
    }
  });
}

// 默认如果没有激活当前路由记录，跳转首页
const defaultActiveCurrentRoute = () => {
  // 当前激活路由
  const currentActive = store.getters.getActiveMenu;
  // 如果没有当前激活路由，则激活首页
  if (!currentActive) {
    store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(homeRoute))
  }
}

let defaultActive = ref(route.fullPath);

const toggleCollapse = (val) => {
  isCollapse.value = val;
}

const angularRoute = () => {
  router.push("/microAngular/login")
}

const childRoute = () => {
  router.push("/microChild/login")
}

const embpRoute = () => {
  router.push("/microEmbpWeb/wel/home")
}

// 获取老异常的菜单
const getOldMenu = () => {
  console.log(VUE_APP_MICRO_ANGULAR)
  oldMenu().then(({ data }) => {
    store.commit("SAVE_oldSys_LOGIN_INFO", JSON.stringify(data))
    sessionStorage.setItem("microMain_oldSys_login_info", JSON.stringify(data || {}));
    fmtOldMenu(data.menus);
    oldMenuData.value = data.menus;
  })
}

// 格式化老异常菜单路由
const fmtOldMenu = (menu = []) => {
  menu.forEach(item => {
    item.microModule = "embpAngular";
    item.name = item.text;
    if (item.path) {
      item.microFullPath = VUE_APP_MICRO_ANGULAR + "/wel/" + item.path;
      item.menuPath = item.microFullPath;
    }
    if (item.children) {
      fmtOldMenu(item.children);
    }
  })
}

watch(
  route, 
  () => {
  defaultActive.value = route.fullPath;
})

onMounted(() => {
  setTimeout(() => {
    // getMenu()
    console.log("getMenu---", getMenu)
    getOldMenu()
  }, 1000)
})

</script>

<style scoped lang="scss">
.layout-menu {
  background-color: transparent;
  .el-sub-menu {
    .el-menu {
      background-color: transparent;
    }
  }
}

.layout-menu:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}
</style>