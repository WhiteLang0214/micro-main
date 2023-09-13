<template>
  <div class="micro-tab-menu">
    <div class="micro-button">
      <!-- <el-button :disabled="disabledLeftButton" @click="preClick"><el-icon><ArrowLeft /></el-icon></el-button> -->
      <div class="tab-menu-box" ref="tabMenuBoxRef">
          <el-button
            :class="getCurrentRoute.fullPath === i.microFullPath ? 'micro-tab-menu-active' : ''"
            :type="getCurrentRoute.fullPath === i.microFullPath ? 'primary' : ''"
            :plain="getCurrentRoute.fullPath === i.microFullPath ? false : true"
            bg
            v-for="(i, index) in getActiveRouteMatched"
            :key="i.fullPath"
            @click="changeRoute(i)"
            >
            {{ i.name }}
          <template v-if="i.id !== getHomeMenuId">
            <el-icon class="micro-tab-menu-close" @click.stop="closeMenu(i, index)"><Close /></el-icon>
          </template>
        </el-button>
      </div>
    </div>

    <div class="micro-drpodown">
      <!-- <el-button :disabled="disabledRightButton" @click="nextClick"><el-icon><ArrowRight /></el-icon></el-button> -->
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="clickDropdown('currentPage')"
              :disabled="getCurrentRoute.fullPath === '/microMain/home'">关闭当前页</el-dropdown-item>
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
const tabMenuBoxRef = ref(null)

let routeMatched = ref(route.matched);
// let activeCurrentRouteIndex = ref(-1); // 当前激活路由索引

// // 左侧上一页按钮是否禁用
// const disabledLeftButton = computed(() => {
//   // 当前激活路由是最后一个路由，禁用
//   activeCurrentRouteIndex.value = getActiveRouteMatched.value.findIndex(i => i.microFullPath === getCurrentRoute.value.fullPath)
//   if (activeCurrentRouteIndex.value <= 0) {
//     return true
//   }
//   return false
// })

// // 右侧下一页按钮是否禁用
// const disabledRightButton = computed(() => {
//   // 当前激活路由是最后一个路由，禁用
//   activeCurrentRouteIndex.value = getActiveRouteMatched.value.findIndex(i => i.microFullPath === getCurrentRoute.value.fullPath)
//   if (activeCurrentRouteIndex.value === getActiveRouteMatched.value.length - 1) {
//     return true
//   }
//   return false
// })

// // 上一页
// const preClick = () => {
//   let activeIndex = activeCurrentRouteIndex.value;
//   console.log("上一页---当前激活路由索引", activeIndex)
//   console.log(tabMenuBoxRef.value)
//   activeIndex--;
//   changeRoute(getActiveRouteMatched.value[activeIndex])
// }

// // 下一页
// const nextClick = () => {
//   let activeIndex = activeCurrentRouteIndex.value;
//   console.log("下一页---当前激活路由索引", activeIndex)
//   activeIndex++;
//   changeRoute(getActiveRouteMatched.value[activeIndex])
// }

const changeRoute = (i) => {
  if (i.path !== route.fullPath) {
    // microFullPath 是带着不同微应用的baseUrl的
    router.push(i.microFullPath)
    store.commit("SAVE_CURRENTACTIVEMENU", JSON.stringify(i))
  }
}

const closeMenu = (e, index) => {
  const currentActive = getCurrentRoute.value; // store.getters.getActiveMenu;
  // 当前激活路由 == 点击关闭路由
  if (currentActive.fullPath == e.microFullPath) {
    closeTab(e, index)
  } else {
    // 如果关闭的tab不是当前激活的路由，直接从激活路由栈记录中删除
    store.commit("DELETE_ACTIVE_ROUTEMATCHED", e)
  }
}

const closeTab = (e, index) => {
  // 激活路由栈长度
  const len = getActiveRouteMatched.value.length;
  let jumpRoute = null;
  // 关闭路由是首页，则不操作
  if (e.id === getHomeMenuId.value) {
    return
  } else {
    // 如果是最后一个路由，则激活前面的一个路由
    if (index + 1 < len) {
      // 激活后一个路由
      jumpRoute = getActiveRouteMatched.value[index + 1];
    } else {
      // 激活前一个路由
      jumpRoute = getActiveRouteMatched.value[index - 1];
    }
    // 存在路由数据, 做跳转且从激活路由栈删除改路由
    if (jumpRoute) {
      changeRoute(jumpRoute)
      store.commit("DELETE_ACTIVE_ROUTEMATCHED", e)
    }
  }
}

const clickDropdown = (e) => {
  // 如果只有一个tab，且为首页，则不进行操作
  if (getActiveRouteMatched.value.length == 1 && getActiveRouteMatched.value[0].id === getHomeMenuId) {
    return
  }
  if (e === "currentPage") {
    closeCurrentPage()
  }

  if (e === "otherPage") {
    closeOtherPage()
  }

  if (e === "allPage") {
    closeAllPath()
  }
}

// 关闭当前页面
const closeCurrentPage = () => {
  // 当前激活路由的索引和当前激活路由
  const activeRouteIndex = getActiveRouteMatched.value.findIndex(i => i.microFullPath === getCurrentRoute.value.fullPath)
  // console.log("activeRouteIndex---", activeRouteIndex, getActiveRouteMatched.value[activeRouteIndex])
  closeTab(getActiveRouteMatched.value[activeRouteIndex], activeRouteIndex)
}

// 关闭其他页面
const closeOtherPage = () => {
  // 过滤出当前激活的路由，重置激活路由栈
  const filterActiveRoute = getActiveRouteMatched.value.filter(i => i.microFullPath === getCurrentRoute.value.fullPath)
  // 如果当前激活路由是首页
  if (filterActiveRoute[0]?.id === getHomeMenuId.value) {
    closeAllPath()
  } else {
    store.commit("RESET_ACTIVE_ROUTE_MATCHED", [ homePath, ...filterActiveRoute ])
  }
}

// 关闭全部页面
const closeAllPath = () => {
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
  width: 100%;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  align-items: center;
  position: relative;
  margin-bottom: 8px;

  .micro-button {
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
  }
  .tab-menu-box {
    width: 98%;
    display: flex;
    flex-wrap: nowrap;
    align-items: flex-end;
    overflow: hidden;
    overflow-x: scroll;
    padding-right: 14px;
    ::-webkit-resizer {
      display: none;
    }
  }


  .el-button {
    border: none;
    margin: 0 0 0 8px;
  }

  .micro-tab-menu-close {
    margin-left: 6px;
  }

  .micro-drpodown {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    
    .el-dropdown .el-dropdown-link {
      width: 40px;
      height: 28px;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      text-align: center;
      margin-right: 4px;
      margin-left: 4px;
      background-color: #fff;
      >i {
        margin-left: 0;
      }
    }
  }
}
</style>