<template>
  <el-menu
    :default-active="defaultActive"
    :default-openeds="[defaultActive]"
    class="layout-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="/microMain/home">
      <template #title>
        <el-icon><location /></el-icon>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>子应用</span>
      </template>
      <el-menu-item index="/microChild/home">子应用home</el-menu-item>
      <el-menu-item index="/microChild/about">子应用about</el-menu-item>
      <el-menu-item index="/microChild/setting">setting</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/microMain/setting" @click="clickMenu('/microMain/setting')">
      <el-icon><Menu /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
    <el-menu-item index="/microMain/about">
      <el-icon><document /></el-icon>
      <template #title>关于我们</template>
    </el-menu-item>
    <el-menu-item index="/microUserCenter/microApp">用户中心microApp</el-menu-item>
    <template v-for="item in menuData" :key="item.id">
      <SubMenu :item="item" />
    </template>
  </el-menu>
</template>

<script lang="js" setup>

import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { ucMenuPc } from "@/api/login"
import SubMenu from "@/components/menu/sub-menu.vue"
import { useRouter, useRoute } from 'vue-router'

const store = useStore();
const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);
let menuData = ref([]);

const handleOpen = () => {};
const handleClose = () => {};

// 获取用户中心菜单
const getMenu = () => {
  ucMenuPc(["UC200","UC100", "bi000", "CI000", "M02"]).then(res => {
    const { info } = res || {};
    menuData.value = info?.menus || [];
    store.commit("SAVE_LOGIN_INFO", JSON.stringify(info))
    sessionStorage.setItem("microMain_login_info", JSON.stringify(info))
  }).catch(() => {})
}

const clickMenu = (path) => {
  router.push(path)
}

const defaultActive = route.fullPath;

onMounted(() => {
  setTimeout(() => {
    getMenu()
  }, 1000)
})

</script>

<style scoped>
</style>