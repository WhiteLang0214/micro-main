<template>
  <el-menu
    default-active="2"
    class="layout-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
  <div class="layout-box"></div>
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
    <!-- <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>任务管理</span>
      </template>
      <el-menu-item index="/microCibp/home">任务管理homeindex</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/microMain/setting">
      <el-icon><Menu /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
    <el-menu-item index="/microMain/about">
      <el-icon><document /></el-icon>
      <template #title>关于我们</template>
    </el-menu-item> -->
    <el-sub-menu
      :index="item.menuid"
      v-for="item in menuData"
      :key="item.menuid">
      <template #title>
        <el-icon><location /></el-icon>
        <span>{{ item.text }}</span>
      </template>
        <MenuItem :menuItemData="item"></MenuItem>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="js" setup>

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { basMenuPc } from "@/api/login"
import MenuItem from "./menu-item.vue"

const router = useRouter();

const isCollapse = ref(false);
let menuData = ref([]);

const handleOpen = () => {};
const handleClose = () => {};

const handleSelect = (index) => {
  console.log("点击菜单---", index, router)
  router.push('/microcibp/wel/home')
};

// 获取菜单
const getMenu = () => {
  basMenuPc().then(res => {
    const { data } = res?.info || {};
    menuData.value = data?.menus || [];
  }).catch(() => {})
}

onMounted(() => {
  getMenu()
})

</script>

<style scoped>
</style>