<template>
  <div class="micro-tab-menu">
    <el-button
      :class="route.fullPath === i.currentActivePath ? 'micro-tab-menu-active' : ''"
      :text="route.fullPath === i.currentActivePath ? true : false"
      :type="route.fullPath === i.currentActivePath ? 'primary' : 'default'"
      bg
      v-for="i in routeMatched"
      :key="i.fullPath"
      @click="changeRoute(i)"
      >{{ i.name || i.meta?.title }}</el-button
    >
  </div>
</template>

<script lang="js" setup>

import { watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";

const route = useRoute();
const router = useRouter();
const store = useStore();

let routeMatched = ref(route.matched);

const changeRoute = (i) => {
  if (i.path !== route.fullPath) {
    // currentActivePath 是带着不同微应用的baseUrl的
    router.push(i.currentActivePath)
    store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify({ ...i, currentActivePath: i.currentActivePath }))
  }
}

watch(
  route,
  () => {
    routeMatched.value = store.getters.getActiveRouteMatched;
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.micro-tab-menu {
  padding: 0 10px 10px;
  .el-button {
    border-radius: 0;
    &.is-has-bg,
    &:active.is-has-bg,
    &:hover.is-has-bg,
    &:focus.is-has-bg {
      background-color: #fff;
      border: none;
    }
    &.micro-tab-menu-active {
      position: relative;
      &:after {
        content: "";
        display: block;
        width: 100%;
        height: 10px;
        background-color: #fff;
        position: absolute;
        left: 0;
        bottom: -10px;
      }
    }
  }
}
</style>