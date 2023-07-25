<template>
  <el-container class="layout-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- 子应用渲染容器 -->
        <section id="microContainer"></section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="Layout">

import { onMounted, onUnmounted } from 'vue';
import startQiankun from "@/startQiankun";
import Menu from "./menu.vue"

onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true
    startQiankun()
  }
})

onUnmounted(() => {
  window.qiankunStarted = null;
})
</script>

<style scoped>

.layout-container {
  height: 100%;
}

.layout-container .el-menu {
  height: 100%;
}
</style>
