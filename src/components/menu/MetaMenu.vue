<template>
  <el-menu
    :default-active="defaultActive"
    :default-openeds="[defaultActive]"
    class="layout-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="item in menuData" :key="item.id">
      <MetaSubMenu :item="item" />
    </template>
  </el-menu>
</template>

<script lang="js" setup>

import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ucMenuPc } from "@/api"
import { useRoute } from 'vue-router'
import { homePath } from "@/router";

const store = useStore();
const route = useRoute();
const isCollapse = ref(false);
const homeRoute = ref(homePath)

let menuData = ref([homeRoute]);
const VUE_APP_MICRO_UC = process.env.VUE_APP_MICRO_UC;
const VUE_APP_MICRO_BI = process.env.VUE_APP_MICRO_BI;
const VUE_APP_MICRO_EMBP = process.env.VUE_APP_MICRO_EMBP;

const handleOpen = () => {};
const handleClose = () => {};

// 创建路由
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

watch(
  route, 
  () => {
  defaultActive.value = route.fullPath;
})

onMounted(() => {
  setTimeout(() => {
    getMenu()
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
</style>