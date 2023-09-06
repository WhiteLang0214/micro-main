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
      <template v-if="i.id !== 'M0001'">
        <el-icon class="micro-tab-menu-close" @click.stop="closeMenu(i, index)"><Close /></el-icon>
      </template>
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
  // 有当前激活路由，则跳转激活路由。反之跳首页
  const currentActive = store.getters.getActiveMenu;
  if (JSON.parse(currentActive).menuPath == e.menuPath) {
    closeTab(e, index)
  } else {
    store.commit("DELETE_ACTIVE_ROUTEMATCHED", e)
  }
}

const closeTab = (e, index) => {
  // 激活路由栈长度
  const len = getActiveRouteMatched.value.length;
  let jumpRoute = null;
  if (index + 1 < len) {
    // 激活后一个路由
    jumpRoute = getActiveRouteMatched.value[index + 1];
  } else {
    // 激活前一个路由
    jumpRoute = getActiveRouteMatched.value[index - 1];
  }
  // 存在路由数据
  if (jumpRoute) {
    changeRoute(jumpRoute)
    store.commit("DELETE_ACTIVE_ROUTEMATCHED", e)
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