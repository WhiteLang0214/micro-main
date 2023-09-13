<template>
  <el-container class="layout-container">
    <meta-header />
    <el-container>
      <el-aside width="200px">
        <MetaMenu />
      </el-aside>
      <el-main class="layout-main">
        <MetaTabMenu />
        <div class="router-container custom-loading-svg"
          v-loading="setLoading"
          :element-loading-svg="svg"
          element-loading-svg-view-box="-10, -10, 50, 50">
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
import startQiankun from "@/qiankun/start";
import { useStore } from "vuex";

const store = useStore();

const svg = `
  <path class="path" d="
    M 30 15
    L 28 17
    M 25.61 25.61
    A 15 15, 0, 0, 1, 15 30
    A 15 15, 0, 1, 1, 27.99 7.5
    L 15 15
  " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
`

onMounted(() => {
  if (!window.qiankunStarted) {
    window.qiankunStarted = true;
    startQiankun();
  }
});

const setLoading = computed(() => store.getters.getRouterViewLoading)

onUnmounted(() => {
  window.qiankunStarted = null;
});
</script>

<style scoped lang="scss">
.layout-container {
  height: 100%;
  background-color: #f2f2f5;
  flex-direction: column;
}

.layout-container .el-menu {
  height: 100%;
}

.layout-container .el-container {
  height: 100%;
  overflow-y: auto;
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
