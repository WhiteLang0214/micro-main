<template>
  <el-menu
    :default-active="defaultActive"
    :default-openeds="[defaultActive]"
    class="layout-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template v-for="item in menuData" :key="item.id">
      <SubMenu :item="item" />
    </template>
  </el-menu>
</template>

<script lang="js" setup>

import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { ucMenuPc } from "@/api/login"
import SubMenu from "@/components/menu/sub-menu.vue"
import { useRoute } from 'vue-router'

const store = useStore();
const route = useRoute();
const isCollapse = ref(false);
let menuData = ref([
  {
    menuPath: '/microMain/home',
    name: '主应用首页',
    id: ""
  },
  {
    menuPath: '/microMain/setting',
    name: '主应用设置',
    id: ""
  },
  {
    menuPath: '/microMain/about',
    name: '主应用关于',
    id: ""
  }
]);

const handleOpen = () => {};
const handleClose = () => {};

// 获取用户中心菜单
const getMenu = () => {
  ucMenuPc(["UC200","UC100", "bi000", "CI000", "M02"]).then(res => {
    const { info } = res || {};
    menuData.value = menuData.value.concat(info?.menus || []);
    store.commit("SAVE_LOGIN_INFO", JSON.stringify(info))
    sessionStorage.setItem("microMain_login_info", JSON.stringify(info))
  }).catch(() => {})
}

let defaultActive = ref(route.fullPath);

watch(
  route, 
  () => {
  defaultActive.value = route.fullPath;
})

onMounted(() => {
  setTimeout(() => {
    getMenu()
  }, 1000)
})

</script>

<style scoped>
.layout-menu {
  background-color: transparent;
}
</style>