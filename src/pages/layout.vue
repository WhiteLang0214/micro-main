<template>
  <el-container class="layout-container">
    <el-header>Header {{ getUsername }}</el-header>
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

import { computed, onMounted, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import startQiankun from "@/qiankun/start";
import Menu from "./menu.vue"
import { qiankunSetGlobalState } from "@/utils/qiankunActions";

const store = useStore();

const getUsername = computed(() => store.getters.getLoginInfo.username)

onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true
    startQiankun()
  }


  setTimeout(() => {
    qiankunSetGlobalState({
      isLogin: true
    })
  }, 1000)
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
