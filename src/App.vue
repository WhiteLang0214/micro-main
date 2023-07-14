<template>
  <router-link to="/microMain">Home</router-link> |
  <router-link to="/microChild">子应用</router-link>
  <div>
    <router-view></router-view>
    <!-- 子应用渲染的div -->
    <div id="microContainer"></div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
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
  margin-top: 60px;
}
</style>
