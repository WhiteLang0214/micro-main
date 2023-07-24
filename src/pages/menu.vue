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
      <!-- <el-menu-item index="/home/microChild/home">根路径下的子应用login</el-menu-item> -->
      <el-menu-item index="/portal/microChild/about">home下的子应用about</el-menu-item>

    </el-sub-menu>
    <el-menu-item index="/microMain/setting">
      <el-icon><Menu /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
    <el-menu-item index="/microMain/about">
      <el-icon><document /></el-icon>
      <template #title>关于我们</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="js" setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const isCollapse = ref(false);

const handleOpen = () => {};
const handleClose = () => {};

const handleSelect = (index) => {
  router.push(index)
};

</script>

<style scoped>
</style>