<template>
  <div class="micro-tab-menu">
    <el-button
      :class="getCurrentRoute.fullPath === i.currentActivePath ? 'micro-tab-menu-active' : ''"
      :text="getCurrentRoute.fullPath === i.currentActivePath ? true : false"
      :type="getCurrentRoute.fullPath === i.currentActivePath ? 'primary' : 'default'"
      bg
      v-for="(i, index) in getActiveRouteMatched"
      :key="i.fullPath"
      @click="changeRoute(i)"
      >
      {{ i.name || i.meta?.title }}
      <el-icon class="micro-tab-menu-close" @click.stop="closeMenu(i, index)"><Close /></el-icon>
    </el-button>
  </div>
</template>

<script lang="js" setup>

import { computed } from "@vue/reactivity";
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

const closeMenu = (e, index) => {
  store.commit("DELETE_ACTIVE_ROUTEMATCHED", e)
  console.log("index----", index)
  if (getActiveRouteMatched.value.length == 0) {
    const base = process.env.VUE_APP_BASE_URL;
    changeRoute({
      path: base+ "/home",
      name: "主应用首页",
      menuPath: base + "/home",
      currentActivePath: base+ "/home"
    })
  }
}

const getActiveRouteMatched = computed({
  get() {
    return store.getters.getActiveRouteMatched
  },
  set(val) {
    return routeMatched.value = val;
  }
})

// 当前激活路由
const getCurrentRoute = computed(() => route)

watch(
  route,
  () => {
    getActiveRouteMatched.value = store.getters.getActiveRouteMatched;
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang="scss">
.micro-tab-menu {
  padding: 0 0 10px 0;
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

  .micro-tab-menu-close {
    margin-left: 6px;
  }
}
</style>