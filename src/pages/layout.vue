<template>
  <el-container class="layout-container">
    <el-header>Header {{ getUsername }}</el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main class="layout-main">
        <TabMenu />
        <div class="router-container">
          <router-view></router-view>
          <!-- 子应用渲染容器 -->
          <section id="microContainer"></section>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="Layout">
import { computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import startQiankun from "@/qiankun/start";
import Menu from "./menu.vue";
import TabMenu from "@/components/menu/tabMenu"

const store = useStore();

const getUsername = computed(() => JSON.parse(store.getters.getLoginInfo).loginUserInfo?.name);

onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    startQiankun();
  }
});

onUnmounted(() => {
  window.qiankunStarted = null;
});
</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  background-color: #f2f2f5;
}

.layout-container .el-menu {
  height: 100%;
}

.layout-main {
  padding: 0;
  display: flex;
  flex-direction: column;
  .router-container {
    flex: 1;
    overflow: auto;
  }
}
</style>
