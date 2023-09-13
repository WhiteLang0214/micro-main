<template>
  <div class="micro-tab-menu">
    <div class="micro-button">
      <el-button :disabled="disabledLeftButton"><el-icon><ArrowLeft /></el-icon></el-button>
      <el-button
        :class="getCurrentRoute.microFullPath === i.microFullPath ? 'micro-tab-menu-active' : ''"
        :text="getCurrentRoute.microFullPath === i.microFullPath ? true : false"
        :type="getCurrentRoute.microFullPath === i.microFullPath ? 'primary' : 'default'"
        bg
        v-for="(i, index) in getActiveRouteMatched"
        :key="i.fullPath"
        @click="changeRoute(i)"
        >
        {{ i.name || i.meta?.title }}
        <template v-if="i.id !== getHomeMenuId">
          <el-icon class="micro-tab-menu-close" @click.stop="closeMenu(i, index)"><Close /></el-icon>
        </template>
      </el-button>
    </div>

    <div class="micro-drpodown">
      <el-button :disabled="disabledRightButton"><el-icon><ArrowRight /></el-icon></el-button>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="clickDropdown('currentPage')">关闭当前页</el-dropdown-item>
            <el-dropdown-item @click="clickDropdown('otherPage')">关闭其他页</el-dropdown-item>
            <el-dropdown-item @click="clickDropdown('allPage')">关闭所有页</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="js" setup>

import { computed } from "@vue/reactivity";
import { watch, ref } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from "vuex";
import { homePath } from "@/router";

const route = useRoute();
const router = useRouter();
const store = useStore();

let routeMatched = ref(route.matched);

// 左侧上一页按钮是否禁用
const disabledLeftButton = computed(() => {
  // 当前激活路由是最后一个路由，禁用
  const activeCurrentRouteIndex = getActiveRouteMatched.value.findIndex(i => i.microFullPath === getCurrentRoute.value.microFullPath)
  console.log("activeCurrentRouteIndex---", activeCurrentRouteIndex)
  if (activeCurrentRouteIndex <= 0) {
    return true
  }
  return false
})

// 右侧下一页按钮是否禁用
const disabledRightButton = computed(() => {
  // 当前激活路由是最后一个路由，禁用
  console.log("下一页---", getActiveRouteMatched.value, getCurrentRoute.value)
  const activeCurrentRouteIndex = getActiveRouteMatched.value.findIndex(i => i.microFullPath === getCurrentRoute.value.microFullPath)
  console.log("下一页---", activeCurrentRouteIndex)
  if (activeCurrentRouteIndex === getActiveRouteMatched.value.length - 1) {
    return true
  }
  return false
})

const changeRoute = (i) => {
  if (i.path !== route.fullPath) {
    // microFullPath 是带着不同微应用的baseUrl的
    router.push(i.microFullPath)
    store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(i))
  }
}

const closeMenu = (e, index) => {
  const currentActive = getCurrentRoute.value; // store.getters.getActiveMenu;
  console.log("closeMenu currentActive---", currentActive, "当前点击关闭的tab--", e, "当前点击关闭的tab index---", index)
  if (currentActive.fullPath == e.microFullPath) {
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

const clickDropdown = (e) => {
  if (e === "currentPage") {
    closeCurrentPage()
  }

  if (e === "otherPage") {
    closeOtherPage()
  }

  if (e === "allPage") {
    closeAlPath()
  }
}

// 关闭当前页面
const closeCurrentPage = () => {
  // 当前激活路由的索引和当前激活路由
  const activeRouteIndex = getActiveRouteMatched.value.findIndex(i => i.microFullPath === getCurrentRoute.value.fullPath)
  closeTab(getActiveRouteMatched.value[activeRouteIndex], activeRouteIndex)
}

// 关闭其他页面
const closeOtherPage = () => {
  // 过滤出当前激活的路由，重置激活路由栈
  const filterActiveRoute = getActiveRouteMatched.value.filter(i => i.microFullPath === getCurrentRoute.value.fullPath)
  // 如果当前激活路由是首页
  if (filterActiveRoute.id === process.env.VUE_APP_HOME_MENU_ID) {
    closeAlPath()
  } else {
    store.commit("RESET_ACTIVE_ROUTE_MATCHED", [ homePath, ...filterActiveRoute ])
  }
}

// 关闭全部页面
const closeAlPath = () => {
  router.push(homePath)
  store.commit("RESET_ACTIVE_ROUTE_MATCHED", [ homePath ])
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

// 获取首页菜单id
const getHomeMenuId = computed(() => process.env.VUE_APP_HOME_MENU_ID)

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
  padding-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 28px;
  overflow: hidden;
  align-items: center;

  .micro-button {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
  }
  .el-button {
    border-radius: 0;
    border: none;
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

  .micro-drpodown {
    height: 100%;
    background-color: #fff;
    position: relative;
    bottom: 0px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    .el-dropdown{
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 12px;
    }
  }
}
</style>