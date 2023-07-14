<template>
  <el-container class="layout-container">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <Menu />
      </el-aside>
      <el-main>
        <router-view></router-view>
        <!-- 子应用渲染的div -->
        <div id="microContainer"></div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./pages/menu.vue"
export default {
  name: 'App',
  components: {
    Menu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}

.layout-container {
  height: 100%;
}

.layout-container .el-menu {
  height: 100%;
}
</style>
