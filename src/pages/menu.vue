<template>
  <el-menu
    default-active="2"
    class="layout-menu"
    :collapse="isCollapse"
    @open="handleOpen"
    @close="handleClose"
    @select="handleSelect"
  >
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
      <el-menu-item index="/microChild/home">子应用home</el-menu-item>
      <el-menu-item index="/microChild/about">子应用about</el-menu-item>
      <el-menu-item index="/microChild/setting">setting</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/microMain/setting">
      <el-icon><Menu /></el-icon>
      <template #title>设置</template>
    </el-menu-item>
    <el-menu-item index="/microMain/about">
      <el-icon><document /></el-icon>
      <template #title>关于我们</template>
    </el-menu-item>
    <el-menu-item index="/microUserCenter/microApp">用户中心microApp</el-menu-item>
    <template v-for="item in menuData" :key="item.id">
      <SubMenu :item="item" />
    </template>
    
  </el-menu>
</template>

<script lang="js" setup>

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ucMenuPc } from "@/api/login"
import SubMenu from "@/components/menu/sub-menu.vue"

const VUE_APP_MICRO_UC = process.env.VUE_APP_MICRO_UC;
const VUE_APP_MICRO_BI = process.env.VUE_APP_MICRO_BI;
const router = useRouter();
const store = useStore();

const isCollapse = ref(false);
let menuData = ref([]);

const handleOpen = () => {};
const handleClose = () => {};

const handleSelect = (index) => {
  const path = VUE_APP_MICRO_UC + index; // "/microApp";
  const biPath = VUE_APP_MICRO_BI + '/' +index;
  if (index.indexOf("/uc") > -1) { // 用户中心
    router.push(path)
  } else if (index.indexOf("bi") > -1 || index.indexOf("wkf") > -1) {
    router.push(biPath)
  } else {
    router.push(index)
  }
};

// 获取用户中心菜单
const getMenu = () => {
  ucMenuPc(["UC200","UC100", "bi000", "CI000"]).then(res => {
    const { info } = res || {};
    menuData.value = info?.menus || [];
    store.commit("SAVE_LOGIN_INFO", JSON.stringify(info))
    sessionStorage.setItem("microMain_login_info", JSON.stringify(info))
  }).catch(() => {})
}

onMounted(() => {
  setTimeout(() => {
    getMenu()
  }, 1000)
})

</script>

<style scoped>
</style>