<template>
  <el-container class="layout-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup name="Home">
import Menu from "./menu.vue"
</script>

<style scoped>

.layout-container {
  height: 100%;
}

.layout-container .el-menu {
  height: 100%;
}
</style>
